import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@Crud({
    model: { type: User },
})
export class UsersController implements CrudController<User> {
    constructor(public service: UsersService) { }
}
