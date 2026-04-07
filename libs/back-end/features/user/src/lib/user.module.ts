import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entities/user.entity';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthModule } from '@be/auth';
import { AdminUsersController } from './user-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController, AdminUsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
