/* eslint-disable @nx/enforce-module-boundaries */
import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { CreateAiHouseDto } from './dto/create-ai-house.dto';
import { UpdateAiHouseDto } from './dto/update-ai-house.dto';
import { AiHouseEntity } from './entities/ai-house.entity';
import { escapeLikeString } from '@be/shared';

import { ImageService } from '@be/image';
import { SeoService } from '@be/seo';
import { AddressService } from '@be/address';
import { CreateImageDto } from '@be/image/parts';
import { CreateSeoDto } from '@be/seo/parts';
import { UserEntity } from '@be/user/parts';
import { keyBy } from 'lodash-es';

@Injectable()
export class AiHouseService {
  private readonly logger = new Logger(AiHouseService.name);

  constructor(
    @InjectRepository(AiHouseEntity)
    private repository: Repository<AiHouseEntity>,
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
    @Inject(forwardRef(() => SeoService))
    private seoService: SeoService,
    @Inject(forwardRef(() => AddressService))
    private addressService: AddressService,
  ) {}
  create(createAiHouseDto: CreateAiHouseDto) {
    const images = createAiHouseDto.images.map((image) => {
      const { id, ...imageData } = image;
      return this.imageService.create(imageData as CreateImageDto);
    });
    const address = this.addressService.create(createAiHouseDto.address);
    const seo = this.seoService.create(createAiHouseDto.seo as CreateSeoDto);

    const aiHouse = this.repository.create({
      ...createAiHouseDto,
      rating: 0,
      images,
      address,
      seo,
      owner: { id: createAiHouseDto.ownerId } as UserEntity,
    });

    return this.repository.save(aiHouse);
  }

  findAll() {
    return this.repository.find();
  }

  async paginate(
    options: IPaginationOptions,
    { search }: { search?: string },
  ): Promise<Pagination<AiHouseEntity>> {
    const saveSearch = search ? escapeLikeString(search) : undefined;
    return paginate<AiHouseEntity>(this.repository, options, {
      where: {
        ...(saveSearch && { name: ILike(`%${saveSearch}%`) }),
      },
      relations: {
        address: true,
        // owner: true,
        images: true,
        seo: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async paginatePreviews(
    options: IPaginationOptions,
    { search }: { search?: string },
    userId?: string,
  ): Promise<Pagination<AiHouseEntity>> {
    const saveSearch = search ? escapeLikeString(search) : undefined;

    const result = await paginate<AiHouseEntity>(this.repository, options, {
      select: {
        id: true,
        url: true,
        name: true,
        rooms: true,
        area: true,
        price: true,
        rating: true,
        available: true,
        updatedAt: true,
        owner: { id: true },
        seo: { id: true, image: true }, // actually we should have imagePreview for such cases, but for simplicity, we will use the same image for AI HOUSE preview
      },
      where: {
        ...(saveSearch && { name: ILike(`%${saveSearch}%`) }),
      },
      relations: {
        address: true,
        owner: true,
        seo: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });

    const ids = result.items.map((item) => item.id);

    // if userId is present, get likes for this user and mark liked AI Houses with that info.
    if (userId) {
      // can be either 1 or 0, as user can like only once
      const likes = await this.repository
        .createQueryBuilder('aiHouse')
        .select('aiHouse.id')
        .innerJoin('aiHouse.likes', 'likes')
        .where('aiHouse.id IN (:...ids)', { ids })
        .andWhere('likes.id = :userId', { userId })
        .getMany();

      const likesMap = keyBy(likes, 'id');
      result.items.forEach((item) => {
        item.likes = likesMap[item.id] ? [{ id: userId } as UserEntity] : [];
      });
    }

    // get likes count for each AI House
    const likesCount = await this.repository
      .createQueryBuilder('aiHouse')
      .select('aiHouse.id')
      .addSelect('COUNT(likes.id)', 'likesCount')
      .innerJoin('aiHouse.likes', 'likes')
      .where('aiHouse.id IN (:...ids)', { ids })
      .groupBy('aiHouse.id')
      .getRawMany();

    const likesCountMap = keyBy(likesCount, 'aiHouse_id');
    result.items.forEach((item) => {
      item.likesCount = +likesCountMap[item.id]?.likesCount || 0;
    });
    return result;
  }

  findOne(id: string) {
    return this.repository.findOne({
      select: {
        owner: { id: true },
      },
      where: { id },
      relations: { address: true, images: true, seo: true, owner: true },
    });
  }

  // for public API, we can find AI House by URL, as it's more user-friendly than ID
  async findOneByUrl(url: string, userId?: string) {
    const result = await this.repository.findOne({
      select: {
        owner: { id: true },
      },
      where: { url },
      relations: { address: true, images: true, seo: true, owner: true },
    });

    if (!result) {
      throw new NotFoundException(`AiHouse with url ${url} not found`);
    }

    (result as any).likes = [];
    if (userId) {
      // can be either 1 or 0, as user can like only once
      const isLiked = await this.repository
        .createQueryBuilder('aiHouse')
        .innerJoinAndSelect('aiHouse.likes', 'likes')
        .where('aiHouse.id = :id', { id: result.id })
        .andWhere('likes.id = :userId', { userId })
        .getCount();

      if (isLiked) {
        (result as any).likes.push({ id: userId });
      }
    }

    const likesCount = await this.repository
      .createQueryBuilder('aiHouse')
      .select('aiHouse.id')
      .addSelect('COUNT(aiHouse.id)', 'likesCount')
      .innerJoin('aiHouse.likes', 'likes')
      .where('aiHouse.id = :id', { id: result.id })
      .groupBy('aiHouse.id')
      .getRawOne();
    (result as any).likesCount = +likesCount?.likesCount || 0;
    return result;
  }

  async update(id: string, updateAiHouseDto: UpdateAiHouseDto) {
    const entry = await this.findOne(id);
    if (!entry) {
      throw new NotFoundException(`AiHouse with id ${id} not found`);
    }
    const { address, images, seo, ...rest } = updateAiHouseDto as any;

    if (address) {
      entry.address = { ...entry.address, ...address };
    }
    if (seo) {
      entry.seo = { ...entry.seo, ...seo };
    }
    if (images) {
      const imagesMap = keyBy(entry.images, 'id');
      entry.images = images.map((image: any) => {
        const existingImage = imagesMap[image.id];
        return existingImage ? { ...existingImage, ...image } : image;
      });
    }

    Object.assign(entry, rest);

    return this.repository.save(entry);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }

  like(id: string, userId: string) {
    return this.repository
      .createQueryBuilder('aiHouse')
      .relation(AiHouseEntity, 'likes')
      .of(id)
      .add(userId);
  }

  unlike(id: string, userId: string) {
    return this.repository
      .createQueryBuilder('aiHouse')
      .relation(AiHouseEntity, 'likes')
      .of(id)
      .remove(userId);
  }
}
