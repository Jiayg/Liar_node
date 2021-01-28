import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength, validateSync } from 'class-validator';
import { CustomValidationError } from 'src/common/exceptions/custom-validation.error';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sysuser' })
export class User {
  @PrimaryGeneratedColumn({ comment: '主键Id' })
  @ApiProperty({ type: 'number', title: '主键Id' })
  id: number;

  @MinLength(6)
  @MaxLength(24)
  @Column({ comment: '账号' })
  @ApiProperty({ type: 'string', title: '账号' })
  username: string;

  @MinLength(6)
  @MaxLength(24)
  @Column({ comment: '密码' })
  @ApiProperty({ type: 'string', title: '密码' })
  password: string;

  @Column('simple-array', { comment: '角色', nullable: true })
  @ApiProperty({ type: 'string[]', title: '角色' })
  role: string[];

  @Column({ default: true, comment: '状态 1:启用 0:禁用' })
  @ApiProperty({ type: 'boolean', title: '状态 1:启用 0:禁用' })
  status: boolean;

  @CreateDateColumn({ comment: '创建时间' })
  @ApiProperty({ type: 'datatime', title: '创建时间' })
  create_time: Date;

  @Column({ comment: '创建用户' })
  @ApiProperty({ type: 'datatime', title: '创建用户' })
  create_user: string;

  @CreateDateColumn({ comment: '更新时间' })
  @ApiProperty({ type: 'string', title: '更新时间' })
  update_time: Date;

  @Column({ comment: '更新用户' })
  @ApiProperty({ type: 'datatime', title: '更新用户' })
  update_user: string;

  @BeforeInsert()
  doBeforeInsertion() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  @BeforeUpdate()
  doBeforeUpdate() {
    const errors = validateSync(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomValidationError(errors);
    }
  }

  // seed mysql 加密
  async createPassword(password: string) {
    // const h = new hashers.PBKDF2PasswordHasher();
    // const hash = await h.encode(password, h.salt());
    return password;
  }
}
