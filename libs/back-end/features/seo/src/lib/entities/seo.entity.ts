/* eslint-disable @nx/enforce-module-boundaries */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SEO_DB } from '@shared';
import { ImageEntity } from '@be/image';
import { AiHouseEntity } from '@be/ai-house';

@Entity('seo')
export class SeoEntity implements SEO_DB {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255 })
  headline!: string;

  @Column({ type: 'varchar', length: 255 })
  description!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url!: string;

  @Column('simple-array', { nullable: true })
  keywords!: string[];


  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // **** Relations ****
  @OneToOne(() => ImageEntity, (image) => image.seo, { eager: true })
  @JoinColumn()
  image!: ImageEntity;

  @OneToOne(() => AiHouseEntity, (aiHouse) => aiHouse.seo)
  aiHouse!: AiHouseEntity;
}
