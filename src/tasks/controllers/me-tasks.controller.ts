import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ApiTag } from 'src/api-tags.constants';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { GetTasksDto } from '../dtos/get-tasks.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { TasksService } from '../tasks.service';

@Controller('me/tasks')
@ApiTags(ApiTag.Tasks)
@Auth()
@Crud({
  model: { type: Task },
  dto: { create: CreateTaskDto, update: UpdateTaskDto },
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
      category: {
        alias: 'category',
        eager: false,
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
export class MeTasksController implements CrudController<Task> {
  constructor(public service: TasksService) {}

  @Get('/')
  @ApiResponse({ type: [GetTasksDto] })
  async getMany(@CurrentUser() user): Promise<GetTasksDto[]> {
    return this.service.getTasks(user);
  }
}
