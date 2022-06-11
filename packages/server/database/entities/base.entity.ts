import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface IEntity {
  id?: any;
}

export abstract class BaseEntity implements IEntity {
  id?: any;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: 'now()',
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'datetime',
    default: 'now()',
    onUpdate: 'now()',
    nullable: false,
  })
  updatedAt: Date;
}
