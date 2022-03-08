import { ApiProperty } from '@nestjs/swagger';
import { IsHexColor } from 'class-validator';
import { BaseTimeStampEntity } from 'src/common/entities/base-timestamp.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category extends BaseTimeStampEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ nullable: false })
    name: string;

    @ApiProperty()
    @Column({ nullable: false })
    @IsHexColor()
    color: string;

    @ManyToOne(type => User, user => user.categories, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @OneToMany(() => Task, task => task.category)
    tasks: Task[];
}