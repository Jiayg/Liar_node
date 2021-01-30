import { ApiProperty } from "@nestjs/swagger";
import { InputDto } from "src/common/dto/input.dto";

export class UpdateRoleDto extends InputDto {
    @ApiProperty({ type: 'number', title: '主键Id' })
    id: number;

    @ApiProperty({ type: 'string', title: '名称' })
    name: string;

    @ApiProperty({ type: 'string', title: '别名' })
    alias: string;

    @ApiProperty({ type: 'boolean', title: '状态 1:启用 0:禁用' })
    status: boolean;
}