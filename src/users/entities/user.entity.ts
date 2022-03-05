import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;
}