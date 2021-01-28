import { ApiProperty } from "@nestjs/swagger";

// 入参基类
export class InputDto {
    @ApiProperty({ title: '用户Id' })
    userid?: string;

    @ApiProperty({ title: '用户名' })
    username?: string;
}