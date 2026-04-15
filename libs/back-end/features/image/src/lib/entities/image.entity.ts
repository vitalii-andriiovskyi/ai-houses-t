/* eslint-disable @nx/enforce-module-boundaries */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Image, ImageType } from '@shared';
import { SeoEntity } from '@be/seo/parts';
import { UserEntity } from '@be/user/parts';
import { AiHouseEntity } from '@be/ai-house/parts';

@Entity('images')
export class ImageEntity implements Image {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  src!: string;

  @Column({ type: 'varchar', length: 255 })
  alt!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title!: string;

  @Column({ type: 'int', nullable: true })
  width!: number;

  @Column({ type: 'int', nullable: true })
  height!: number;

  @Column({
    type: 'enum',
    enum: ImageType,
    nullable: true,
  })
  type!: ImageType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  caption!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // **** Relations ****
  @OneToOne(() => SeoEntity, (seo) => seo.image)
  seo!: SeoEntity;

  @OneToMany(() => UserEntity, (user) => user.image)
  users!: UserEntity[];

  @ManyToMany(() => AiHouseEntity, (aiHouse) => aiHouse.images)
  aiHouses!: AiHouseEntity[];
}
