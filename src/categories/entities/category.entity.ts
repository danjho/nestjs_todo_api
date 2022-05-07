import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsHexColor, IsNotEmpty } from 'class-validator';
import { BaseTimeStampEntity } from 'src/common/entities/base-timestamp.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Category extends BaseTimeStampEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Column({ nullable: false })
  @IsHexColor()
  color: string;

  @ManyToOne((type) => User, (user) => user.categories, { nullable: false })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
