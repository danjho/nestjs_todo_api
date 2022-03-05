import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
@Crud({
    model: { type: Category },
    dto: {
        create: CreateCategoryDto
    }
})
export class CategoriesController implements CrudController<Category> {
    constructor(public service: CategoriesService) { }
}
