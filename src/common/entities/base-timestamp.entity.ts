import { Exclude } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTimeStampEntity {
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Exclude({ toClassOnly: true })
  public createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  @Exclude({ toClassOnly: true })
  public updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  @Exclude({ toClassOnly: true })
  public deletedAt?: Date;
}

type BaseTimeStampFields = keyof BaseTimeStampEntity;

export const baseTimeStampFields: BaseTimeStampFields[] = [
  'createdAt',
  'updatedAt',
  'deletedAt',
];
