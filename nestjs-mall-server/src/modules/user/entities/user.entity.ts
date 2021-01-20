import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @ApiProperty({ type: 'number', title: '主键Id' })
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ type: 'string', title: '姓' })
    fristname: string;

    @Column()
    @ApiProperty({ type: 'string', title: '名' })
    lastName: string;

    @Column({ default: true })
    @ApiProperty({ type: 'string', title: '是否启用' })
    isActive: boolean;
}