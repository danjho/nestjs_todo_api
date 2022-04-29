import { Controller, Get } from '@nestjs/common';
import {
  ApiResponse, ApiTags
} from '@nestjs/swagger';
import {
  Crud,
  CrudAuth,
  CrudController
} from '@nestjsx/crud';
import { ApiTag } from 'src/api-tags.constants';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Auth } from '../../common/decorators/auth.decorator';
import { CategoriesService } from '../categories.service';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { CategoriesDto } from '../dtos/get-categories.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../entities/category.entity';

@Controller('me/categories')
@ApiTags(ApiTag.Category)
@Auth()
@Crud({
  model: { type: Category },
  dto: { create: CreateCategoryDto, update: UpdateCategoryDto },
  routes: {
    only: ['createOneBase', 'getOneBase', 'updateOneBase'],
  },
  query: {
    join: {
      user: {
        alias: 'user',
        eager: true,
        select: false,
      },
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
  constructor(public service: CategoriesService) {}

  get base(): CrudController<Category> {
    return this;
  }

  @Get('/')
  @ApiResponse({ type: [CategoriesDto] })
  async getMany(@CurrentUser() user): Promise<CategoriesDto[]> {
    return this.service.getCategories(user);
  }
}
