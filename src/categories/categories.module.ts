import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { MeCategoriesController } from './controllers/me-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
  exports: [CategoriesService],
  controllers: [MeCategoriesController]
})
export class CategoriesModule { }
