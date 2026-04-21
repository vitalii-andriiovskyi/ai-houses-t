/* eslint-disable @nx/enforce-module-boundaries */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hashSync } from 'bcrypt';

import { User, Role } from '@shared';
import { AddressEntity } from '@be/address/parts';
import { ImageEntity } from '@be/image/parts';
import { AiHouseEntity } from '@be/ai-house/parts';

const SALT_ROUNDS = 10; // Define the number of salt rounds for bcrypt
const toBcryptHash: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) =>
    value && value.length !== 60 ? hashSync(value, SALT_ROUNDS) : null, // value.length !== 60 is a simple check to avoid re-hashing an already hashed password
};

const toEmailLowerCase: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) => value && value.toLowerCase(),
};

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 320,
    unique: true,
    transformer: toEmailLowerCase,
  })
  email!: string;

  // https://github.com/nestjs/nest/tree/master/sample/21-serializer
  // https://github.com/typeorm/typeorm/issues/2624#issuecomment-786543403
  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
    select: false,
    transformer: toBcryptHash,
  })
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
    enum: Role,
    array: true,
    default: [Role.User],
  })
  roles!: Role[];

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

  @ManyToMany(() => AiHouseEntity, (aiHouse) => aiHouse.likes)
  likesAiHouses!: AiHouseEntity[];
}
// ****************
// https://github.com/typeorm/typeorm/issues/2624
// ****************
