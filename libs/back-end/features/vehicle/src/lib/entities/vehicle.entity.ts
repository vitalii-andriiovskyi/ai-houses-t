/* eslint-disable @nx/enforce-module-boundaries */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '@be/user/parts';
import { ImageEntity } from '@be/image/parts';
import { SeoEntity } from '@be/seo/parts';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 1000 })
  description!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  url!: string;

  @Column()
  doors!: number;

  @Column()
  seats!: number;

  @Column()
  year!: number;

  @Column({ nullable: true })
  mileage?: number;

  @Column({ type: 'varchar', length: 255 })
  color!: string;

  @Column({ type: 'varchar', length: 255 })
  model!: string;

  @Column()
  price!: number;

  @Column({ default: true })
  available!: boolean;

  @DeleteDateColumn()
  deletedDate!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // One image can be reused by many vehicles as a preview.
  @ManyToOne(() => ImageEntity, { cascade: true })
  @JoinColumn()
  previewImage!: ImageEntity;

  @ManyToMany(() => ImageEntity, { cascade: true })
  @JoinTable()
  images!: ImageEntity[];

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  owner!: UserEntity;

  // Reusable SEO metadata shared across entities.
  @OneToOne(() => SeoEntity, { cascade: true })
  @JoinColumn()
  seo!: SeoEntity;
}
