import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Controller('users')
@Crud({
    model: { type: User },
    routes: { only: ['getOneBase', 'updateOneBase'] },
    params: {
        id: {
            primary: true,
            disabled: true,
        },
    },
})
@CrudAuth({
    property: 'user',
    filter: (user: User) => ({
        id: user.id,
    }),
})
export class MeUsersController implements CrudController<User> {
    constructor(public service: UsersService) { }
}
