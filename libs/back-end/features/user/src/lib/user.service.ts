import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { include, includeAll } from '@be/shared';
import { Role } from '@shared';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOneById(id: string): Promise<UserEntity | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(
    email: string,
    {
      withPassword = false,
      withDeletedDate = false,
      withAddress = false,
      withImage = false,
      withAll = false,
    }: {
      withPassword?: boolean;
      withDeletedDate?: boolean;
      withAddress?: boolean;
      withImage?: boolean;
      withAll?: boolean;
    } = {},
  ): Promise<UserEntity | null> {
    const basicSelect: Array<keyof UserEntity> = [
      'id',
      'firstName',
      'lastName',
      'email',
      'phone',
      'roles',
    ];
    if (withPassword) {
      basicSelect.push('password');
    }

    let select = include(this.usersRepository, basicSelect);

    if (withAll) {
      select = includeAll(this.usersRepository, basicSelect); // should be only { password: true, otherHidden: true } but I include basicSelect.
    }
    return this.usersRepository.findOne({
      where: { email },
      select,
      withDeleted: withDeletedDate,
      relations: {
        ...(withAddress && { address: true }),
        ...(withImage && { image: true }),
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { password, ...rest } = updateUserDto;
    // password has to be updated separately within own route handler and method for the security reasons and to trigger the bcrypt hashing in the UserEntity
    const res = await this.usersRepository.update(id, rest);
    // console.log('res', res); // returns: res UpdateResult { generatedMaps: [], raw: [], affected: 1 }
    return res.raw;
  }

  async updatePassword(id: string, password: string) {
    return this.usersRepository.update(id, { password });
  }

  async softRecover(id: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id },
      withDeleted: true,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.recover(user);
  }

  async softRemove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.softRemove(user);
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.findOneByEmail(createUserDto.email, {
      withDeletedDate: true,
    });
    if (user) {
      if (!user.deletedDate) {
        throw new ConflictException(
          `User with email ${createUserDto.email} already exists.`,
        );
      }
      // to reactivate user with new password
      const { id } = user;
      await this.softRecover(id);
      if (createUserDto.password) {
        await this.updatePassword(id, createUserDto.password);
      }
      await this.update(id, createUserDto); // returns []
      return this.findOneById(id) as Promise<UserEntity>;
    }
    const createdUser = await this.create(createUserDto);
    const { password, ...result } = createdUser;
    return result as UserEntity;
  }

  isAdmin(user: UserEntity): boolean {
    return user.roles?.includes(Role.Admin);
  }
}
