import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeTasksController } from './controllers/me-tasks.controller';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [MeTasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule { }
