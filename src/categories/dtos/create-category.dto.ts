import { OmitType, PartialType } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto extends PartialType(OmitType(Category, ['id', 'user', 'tasks'])) { }
