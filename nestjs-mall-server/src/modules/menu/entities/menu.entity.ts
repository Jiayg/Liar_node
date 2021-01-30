/*
 * @Author: your name
 * @Date: 2021-01-28 11:21:01
 * @LastEditTime: 2021-01-28 14:49:21
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-mall-server\src\modules\user\entities\menu.entity.ts
 */
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sysmenu' })
export class Menu {
    @PrimaryGeneratedColumn({ comment: '主键Id' })
    @ApiProperty({ type: 'number', title: '主键Id' })
    id: number;

    @Column({ comment: 'Icon' })
    @ApiProperty({ type: 'string', title: 'Icon' })
    icon: string;

    @Column({ comment: '名称' })
    @ApiProperty({ type: 'string', title: '名称' })
    name: string;

    @Column({ comment: '编码' })
    @ApiProperty({ type: 'string', title: '编码' })
    code: string;

    @Column({ comment: '组件地址' })
    @ApiProperty({ type: 'string', title: '组件地址' })
    component: string;

    @Column({ comment: '排序' })
    @ApiProperty({ type: 'number', title: '排序' })
    sort: number;

    @Column({ comment: '请求url' })
    @ApiProperty({ type: 'string', title: '请求url' })
    url: string;

    @Column({ comment: '提示' })
    @ApiProperty({ type: 'string', title: '提示' })
    tips: string;

    @Column({ comment: '是否是菜单/按钮' })
    @ApiProperty({ type: 'boolean', title: '是否是菜单/按钮' })
    ismenu: boolean;

    @Column({ comment: '是否开放' })
    @ApiProperty({ type: 'boolean', title: '是否开放' })
    isopen: boolean;

    @Column({ comment: '级别' })
    @ApiProperty({ type: 'number', title: '级别' })
    level: number;

    @Column({ comment: '父级编码' })
    @ApiProperty({ type: 'string', title: '父级编码' })
    pcode: string;

    @Column({ comment: '递归父级菜单编号' })
    @ApiProperty({ type: 'string', title: '递归父级菜单编号' })
    purls: string;

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