/* eslint-disable @nx/enforce-module-boundaries */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { hashSync } from 'bcrypt';

import { User, UserRole } from '@shared';
import { AddressEntity } from '@be/address';
import { ImageEntity } from '@be/image';
import { AiHouseEntity } from '@be/ai-house';

const SALT_ROUNDS = 10; // Define the number of salt rounds for bcrypt
const toBcryptHash: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) => value && value.length !== 60 ? hashSync(value, SALT_ROUNDS) : null // value.length !== 60 is a simple check to avoid re-hashing an already hashed password
}

const toEmailLowerCase: ValueTransformer = {
  from: (value: string) => value,
  to: (value: string) => value && value.toLowerCase()
}

@Entity('users')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 320, unique: true, transformer: toEmailLowerCase })
  email!: string;

  // https://github.com/nestjs/nest/tree/master/sample/21-serializer 
  // https://github.com/typeorm/typeorm/issues/2624#issuecomment-786543403
  @Exclude()
  @Column({ type: 'varchar', length: 255, select: false, transformer: toBcryptHash })
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
    array: true,
    default: [UserRole.User],
  })
  roles!: UserRole[];

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
// ****************
// https://github.com/typeorm/typeorm/issues/2624
// ****************



// userSchema.statics.generateHash = function (password: string) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };

// userSchema.methods.validPassword = function (password: string) {
//   if (!this.password || !password) {
//     return false;
//   }

//   return bcrypt.compareSync(password, this.password);
// };

// userSchema.methods.toJSON = function () {
//   const obj = this.toObject(); //or var obj = this;
//   delete obj.password;
//   return obj;
// };

// userSchema.pre("save", function (next) {
//   if (this.email) {
//     this.email = this.email.toLowerCase();
//   }
//   if (this.password && this.isModified("password")) {
//     this.password = (this.constructor as any).generateHash(this.password);
//   }
//   next();
// });