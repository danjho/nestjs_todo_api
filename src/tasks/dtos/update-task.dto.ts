import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsInt } from "class-validator";
import { Task } from "../entities/task.entity";

export class UpdateTaskDto extends PartialType(OmitType(Task, [])) {
  @ApiProperty()
  @IsInt()
  category: number;
}