/* eslint-disable @nx/enforce-module-boundaries */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User, UserRole } from '@shared';
import { AddressEntity } from '@be/address';
import { ImageEntity } from '@be/image';
import { AiHouseEntity } from '@be/ai-house';

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ default: false })
  isTemporaryPassword!: boolean;

  @Column({ type: 'varchar', length: 255 })
  firstName!: string;

  @Column({ type: 'varchar', length: 255 })
  lastName!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  verificationToken!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role!: UserRole;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recovery!: string;

  @Column({ default: false })
  isRecovered!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  emailVerified!: Date;

  @Column({ type: 'bigint', nullable: true })
  blockBefore!: number;

  @Column({ type: 'json', default: [] })
  attempts!: { time: number }[];

  @DeleteDateColumn()
  deletedDate!: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => AddressEntity, { nullable: true })
  address!: AddressEntity;

  @ManyToOne(() => ImageEntity, { nullable: true })
  image!: ImageEntity;

  @ManyToOne(() => AiHouseEntity, { nullable: true })
  aiHouses!: AiHouseEntity[];
}

