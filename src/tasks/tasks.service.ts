import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToInstance } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { GetTasksDto } from './dtos/get-tasks.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService extends TypeOrmCrudService<Task> {
  constructor(@InjectRepository(Task) repo) {
    super(repo);
  }

  async getTasks(user: User): Promise<GetTasksDto[]> {
    const rawData = await this.repo.manager
      .createQueryBuilder()
      .select('t.*')
      .addSelect('c.color', 'color')
      .from(Task, 't')
      .leftJoin(Category, 'c', 't.category_id = c.id')
      .where(`t.user_id::text = '${user.id}'`)
      .groupBy('t.id')
      .addGroupBy('c.color')
      .getRawMany();

    rawData.forEach((v) => (v['user_id'] = undefined));

    return plainToInstance(GetTasksDto, rawData);
  }
}
