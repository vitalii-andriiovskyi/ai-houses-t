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

import { AIHouse } from '@shared';
import { UserEntity } from '@be/user/parts';
import { AddressEntity } from '@be/address/parts';
import { ImageEntity } from '@be/image/parts';
import { SeoEntity } from '@be/seo/parts';

@Entity('ai_houses')
export class AiHouseEntity implements AIHouse {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 1000 })
  description!: string;

  @Column()
  rooms!: number;

  @Column()
  area!: number;

  @Column()
  price!: number;

  @Column()
  available!: boolean;

  @Column('simple-array', { nullable: true })
  features?: string[];

  @Column()
  builtYear!: Date;

  @Column({ nullable: true })
  lastRenovation?: Date;

  @Column()
  rating!: number;

  @Column({ type: 'json', nullable: true })
  metadata?: any;

  @Column('simple-array', { nullable: true })
  likes?: string[];

  @Column({ unique: true })
  url!: string;

  @DeleteDateColumn()
  deletedDate!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  // **** Relations ****
  @ManyToOne(() => AddressEntity, (address) => address.aiHouses, {
    cascade: true,
  })
  @JoinColumn()
  address!: AddressEntity;

  @ManyToOne(() => UserEntity, (user) => user.aiHouses)
  @JoinColumn()
  owner!: UserEntity;

  @ManyToMany(() => ImageEntity, (image) => image.aiHouses, { cascade: true })
  @JoinTable()
  images!: ImageEntity[];

  @OneToOne(() => SeoEntity, (seo) => seo.aiHouse, { cascade: true })
  @JoinColumn()
  seo!: SeoEntity;
}
