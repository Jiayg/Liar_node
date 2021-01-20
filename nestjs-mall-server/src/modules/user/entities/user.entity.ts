import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: 'number', title: '主键Id' })
    id: number;

    @Column({ comment: '账号' })
    @ApiProperty({ type: 'string', title: '账号' })
    username: string;

    @Column({ comment: '密码' })
    @ApiProperty({ type: 'string', title: '密码' })
    password: string;

    @Column({ default: true })
    @ApiProperty({ type: 'boolean', title: '是否启用' })
    flag: boolean;

    @Column({ default: true })
    @ApiProperty({ type: 'boolean', title: '账户状态' })
    status: boolean;

    @CreateDateColumn({ name: 'create_time' })
    @ApiProperty({ type: 'datatime', title: '创建时间' })
    @ApiProperty()
    createTime: Date;

    @UpdateDateColumn({ name: 'update_time' })
    @ApiProperty({ type: 'string', title: '更新时间' })
    updateTime: Date;

    async createPassword(password: string) {
        // const h = new hashers.PBKDF2PasswordHasher();
        // const hash = await h.encode(password, h.salt());
        return password;
    }

}