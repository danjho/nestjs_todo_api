import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export class CategoriesDto extends OmitType(Category, ['user'] as const) {
  @ApiProperty()
  totalTasks: number;

  @ApiProperty()
  totalDoneTasks: number;
}
