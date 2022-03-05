import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateUserDto extends OmitType(User, ['id', 'password']) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
