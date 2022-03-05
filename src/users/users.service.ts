import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService extends TypeOrmCrudService<User>{
  constructor(@InjectRepository(User) repo) { super(repo) }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.repo.save(user);
  }
}