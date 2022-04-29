import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToInstance } from 'class-transformer';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { CategoriesDto } from './dtos/get-categories.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends TypeOrmCrudService<Category> {
  constructor(@InjectRepository(Category) repo) {
    super(repo);
  }

  async getCategories(user: User): Promise<CategoriesDto[]> {
    const rawData = await this.repo.manager
      .createQueryBuilder()
      .select('c.id', 'id')
      .addSelect('c.name', 'name')
      .addSelect('c.color', 'color')
      .addSelect('count(t.id)::int', 'totalTasks')
      .addSelect(
        'sum(case when t.done then 1 else 0 end)::int',
        'totalDoneTasks',
      )
      .from(Category, 'c')
      .leftJoin(Task, 't', 't.category_id = c.id')
      .where(`c.user_id::text = '${user.id}'`)
      .groupBy('c.id')
      .getRawMany();

    
    return plainToInstance(CategoriesDto, rawData);
  }
}
