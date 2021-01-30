import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sysrelation' })
export class Relation {
    @PrimaryGeneratedColumn({ comment: '主键Id' })
    @ApiProperty({ type: 'number', title: '主键Id' })
    id: number;

    @Column({ comment: '角色id' })
    @ApiProperty({ type: 'number', title: '角色id' })
    roleid: number;

    @Column({ comment: '菜单id' })
    @ApiProperty({ type: 'number', title: '菜单id' })
    menuid: number;

    @Column({ default: true, comment: '状态 1:启用 0:禁用' })
    @ApiProperty({ type: 'boolean', title: '状态 1:启用 0:禁用' })
    status: boolean;

    @CreateDateColumn({ comment: '更新时间' })
    @ApiProperty({ type: 'string', title: '更新时间' })
    update_time: Date;

    @Column({ comment: '更新用户' })
    @ApiProperty({ type: 'datatime', title: '更新用户' })
    update_user: string;
}