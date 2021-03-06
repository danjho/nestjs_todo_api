import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ApiTag } from 'src/api-tags.constants';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';

@Controller('me')
@ApiTags(ApiTag.User)
@Auth()
@Crud({
    model: { type: User },
    dto: { update: UpdateUserDto },
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
