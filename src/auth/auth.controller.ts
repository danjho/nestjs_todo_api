import { Controller, Post, UseGuards, Request, Body, NotFoundException } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags(`Auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    
    if(!user){
      return new NotFoundException();
    }

    const token = await this.authService.login(user);
    return { user, token };
  }

  @Post('sign-up')
  @ApiBody({ type: CreateUserDto })
  async singUP(@Body() user: CreateUserDto) {
    const createdUser = await this.authService.createUser(user);
    createdUser.password = undefined;

    const token = await this.authService.login(createdUser);
    return { user: createdUser, token };
  }
}
