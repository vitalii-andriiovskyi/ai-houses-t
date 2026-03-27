import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '@shared';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UserEntity } from '@be/user';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AiHouseEntity } from '@be/ai-house';

@Entity('addresses')
export class AddressEntity implements Address {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  address1!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address2!: string;

  @Column({ type: 'varchar', length: 255 })
  city!: string;

  @Column({ type: 'varchar', length: 255 })
  state!: string;

  @Column({ type: 'varchar', length: 20 })
  zip!: string;

  @Column({ type: 'varchar', length: 255 })
  country!: string;

  @Column({ type: 'varchar', length: 255 })
  apt!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => UserEntity, (user) => user.address)
  users!: UserEntity[];

  @OneToMany(() => AiHouseEntity, (aiHouse) => aiHouse.address)
  aiHouses!: AiHouseEntity[];
}
