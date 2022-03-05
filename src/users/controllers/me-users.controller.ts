import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Controller('me')
@Auth()
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
