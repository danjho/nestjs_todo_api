import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { MeUsersController } from './controllers/me-users.controller';
import { UsersSubscriber } from './users.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersSubscriber],
  exports: [UsersService],
  controllers: [MeUsersController],
})
export class UsersModule { }
