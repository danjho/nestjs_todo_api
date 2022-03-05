import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags(`Auth`)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
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
