import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Category } from 'src/categories/entities/category.entity';
import { BaseTimeStampEntity } from 'src/common/entities/base-timestamp.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseTimeStampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty()
  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @ApiProperty()
  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(() => Category, category => category.user)
  categories: Category[];

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}