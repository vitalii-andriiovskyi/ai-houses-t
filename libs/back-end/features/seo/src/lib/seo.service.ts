import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSeoDto } from './dto/create-seo.dto';
import { UpdateSeoDto } from './dto/update-seo.dto';
import { SeoEntity } from './entities/seo.entity';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ImageService } from '@be/image';

@Injectable()
export class SeoService {
  constructor(
    @InjectRepository(SeoEntity)
    private repository: Repository<SeoEntity>,
    @Inject(forwardRef(() => ImageService))
    private imageService: ImageService,
  ) {}

  create(createSeoDto: CreateSeoDto) {
    const { image, ...seoData } = createSeoDto;
    const seo = this.repository.create(seoData);
    if (image) {
      const imageEntity = this.imageService.create(image);
      seo.image = imageEntity;
    }
    return seo;
  }

  createAndSave(createSeoDto: CreateSeoDto) {
    const seo = this.create(createSeoDto);
    return this.repository.save(seo);
  }

  findAll() {
    return `This action returns all seo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seo`;
  }

  update(id: number, updateSeoDto: UpdateSeoDto) {
    return `This action updates a #${id} seo`;
  }

  remove(id: number) {
    return `This action removes a #${id} seo`;
  }
}
