import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto extends PartialType(OmitType(Task, ['id', 'done', 'user', 'category'])) {
    @ApiProperty()
    @IsInt()
    category: number;
}
