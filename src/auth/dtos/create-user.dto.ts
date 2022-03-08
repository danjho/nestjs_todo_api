import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Max, Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateUserDto extends PartialType(OmitType(User, ['id', 'password', 'categories', 'tasks'])) {
  @ApiProperty()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
