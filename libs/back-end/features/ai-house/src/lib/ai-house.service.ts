/* eslint-disable @nx/enforce-module-boundaries */
import {
  forwardRef,
  Inject,
  Injectable,
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

  findOne(id: string) {
    return this.repository.findOne({
      select: {
        owner: { id: true },
      },
      where: { id },
      relations: { address: true, images: true, seo: true, owner: true },
    });
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
}
