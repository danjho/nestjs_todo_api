import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;
  
  @ApiProperty()
  @Column({ unique: true })
  email: string;
  
  @ApiProperty()
  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;
  
  @ApiProperty()
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;
  
  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;
}