import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/auth/dtos/create-user.dto";

export class UpdateUserDto extends OmitType(CreateUserDto, ['email', 'password']) { }