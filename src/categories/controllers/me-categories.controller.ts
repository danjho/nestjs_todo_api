import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { User } from 'src/users/entities/user.entity';
import { CategoriesService } from '../categories.service';
import { Auth } from '../../common/decorators/auth.decorator';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../entities/category.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiTag } from 'src/api-tags.constants';

@Controller('me/categories')
@ApiTags(ApiTag.Category)
@Auth()
@Crud({
    model: { type: Category },
    dto: { create: CreateCategoryDto },
    routes: {
        only: ['createOneBase', 'getOneBase', 'updateOneBase', 'getManyBase'],
    },
    query: {
        join: {
            user: {
                alias: 'user',
                eager: true,
                select: false,
            },
            tasks: {}
        },
    },
})
@CrudAuth({
    property: 'user',
    filter: (user: User) => ({
        'user.id': user.id,
    }),
    persist: (user: User) => {
        return { user };
    },
})
export class MeCategoriesController implements CrudController<Category> {
    constructor(public service: CategoriesService) { }
}
