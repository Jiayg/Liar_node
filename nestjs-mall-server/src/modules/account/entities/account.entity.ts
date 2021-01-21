import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: 'number', title: '主键Id' })
  id: number = undefined;

  @CreateDateColumn({ name: 'create_time' })
  @ApiProperty({ type: 'datatime', title: '创建时间' })
  @ApiProperty()
  createTime: Date;
}
