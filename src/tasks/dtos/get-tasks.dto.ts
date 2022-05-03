import { OmitType, PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Task } from '../entities/task.entity';

export class GetTasksDto extends OmitType(Task, ['user'] as const){
  @ApiProperty()
  color: string;
}
