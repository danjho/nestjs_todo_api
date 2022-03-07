import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty()
    @Column({ nullable: false })
    title: string;

    @ApiProperty()
    @Column({ default: false })
    done: boolean;

    @ApiProperty()
    @Column()
    date: Date;

    @ManyToOne(() => User, user => user.tasks, { nullable: false })
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Category, category => category.tasks, { nullable: false })
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category: Category
}