import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ApiTag } from 'src/api-tags.constants';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { Task } from '../entities/task.entity';
import { TasksService } from '../tasks.service';

@Controller('tasks')
@ApiTags(ApiTag.Tasks)
@Auth()
@Crud({
    model: { type: Task },
    dto: { create: CreateTaskDto },
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
    constructor(public service: TasksService) { }
}