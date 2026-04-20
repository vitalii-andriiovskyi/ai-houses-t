/* eslint-disable @nx/enforce-module-boundaries */
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { keyBy } from 'lodash-es';

import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehicleEntity } from './entities/vehicle.entity';
import { escapeLikeString } from '@be/shared';
import { ImageService } from '@be/image';
import { SeoService } from '@be/seo';
import { CreateImageDto } from '@be/image/parts';
import { CreateSeoDto } from '@be/seo/parts';
import { UserEntity } from '@be/user/parts';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private repository: Repository<VehicleEntity>,
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
    @Inject(forwardRef(() => SeoService))
    private seoService: SeoService,
  ) {}

  create(createVehicleDto: CreateVehicleDto) {
    const previewImage = this.imageService.create(
      createVehicleDto.previewImage as CreateImageDto,
    );

    const images = createVehicleDto.images.map((image) => {
      const { id, ...imageData } = image;
      return this.imageService.create(imageData as CreateImageDto);
    });

    const seo = this.seoService.create(createVehicleDto.seo as CreateSeoDto);

    const vehicle = this.repository.create({
      ...createVehicleDto,
      previewImage,
      images,
      seo,
      owner: { id: createVehicleDto.ownerId } as UserEntity,
    });

    return this.repository.save(vehicle);
  }

  async paginate(
    options: IPaginationOptions,
    { search }: { search?: string },
  ): Promise<Pagination<VehicleEntity>> {
    const safeSearch = search ? escapeLikeString(search) : undefined;

    return paginate<VehicleEntity>(this.repository, options, {
      where: {
        ...(safeSearch && { name: ILike(`%${safeSearch}%`) }),
      },
      relations: {
        previewImage: true,
        images: true,
        seo: true,
        // owner: true,
      },
      order: {
        updatedAt: 'DESC',
      },
    });
  }

  async paginatePreviews(
    options: IPaginationOptions,
    { search }: { search?: string },
  ): Promise<Pagination<VehicleEntity>> {
    const safeSearch = search ? escapeLikeString(search) : undefined;

    return paginate<VehicleEntity>(this.repository, options, {
      select: {
        id: true,
        url: true,
        name: true,
        description: true,
        price: true,
        year: true,
        doors: true,
        seats: true,
        mileage: true,
        available: true,
        updatedAt: true,
        previewImage: true,
        owner: { id: true },
      },
      where: {
        ...(safeSearch && { name: ILike(`%${safeSearch}%`) }),
      },
      relations: {
        previewImage: true,
        owner: true,
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
      relations: {
        previewImage: true,
        images: true,
        seo: true,
        owner: true,
      },
    });
  }

  async findOneByUrl(url: string) {
    const result = await this.repository.findOne({
      select: {
        owner: { id: true },
      },
      where: { url },
      relations: {
        previewImage: true,
        images: true,
        seo: true,
        owner: true,
      },
    });

    if (!result) {
      throw new NotFoundException(`Vehicle with url ${url} not found`);
    }

    return result;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto) {
    const entry = await this.findOne(id);
    if (!entry) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }

    const { previewImage, images, seo, ...rest } = updateVehicleDto;

    if (previewImage) {
      entry.previewImage = {
        ...entry.previewImage,
        ...previewImage,
      } as VehicleEntity['previewImage'];
    }

    if (seo) {
      entry.seo = { ...entry.seo, ...seo } as VehicleEntity['seo'];
    }

    if (images) {
      const imagesMap = keyBy(entry.images, 'id');
      entry.images = images.map((image: { id?: string }) => {
        const imageId = image.id;
        if (!imageId) {
          return image as VehicleEntity['images'][number];
        }
        const existingImage = imagesMap[imageId];
        return existingImage
          ? { ...existingImage, ...image }
          : (image as VehicleEntity['images'][number]);
      });
    }

    Object.assign(entry, rest);

    return this.repository.save(entry);
  }

  remove(id: string) {
    return this.repository.softDelete(id);
  }
}
