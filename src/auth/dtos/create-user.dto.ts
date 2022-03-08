import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateUserDto extends PartialType(OmitType(User, ['id', 'password', 'categories', 'tasks'])) {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
