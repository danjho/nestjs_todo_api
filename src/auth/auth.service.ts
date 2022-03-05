import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });
    if (!user) return null;

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    user.password = null;
    return user;
  }

  async login(user: Partial<User>) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(user);
  }
}