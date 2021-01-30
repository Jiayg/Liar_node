import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sysrole' })
export class Role {
    @PrimaryGeneratedColumn({ comment: '主键Id' })
    @ApiProperty({ type: 'number', title: '主键Id' })
    id: number;

    @Column({ comment: '名称' })
    @ApiProperty({ type: 'string', title: '名称' })
    name: string;

    @Column({ comment: '别名' })
    @ApiProperty({ type: 'string', title: '别名' })
    alias: string;

    @Column({ default: true, comment: '状态 1:启用 0:禁用' })
    @ApiProperty({ type: 'boolean', title: '状态 1:启用 0:禁用' })
    status: boolean;

    @CreateDateColumn({ comment: '创建时间' })
    @ApiProperty({ type: 'datatime', title: '创建时间' })
    @ApiProperty()
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
}