import { ApiProperty } from "@nestjs/swagger";
import { InputDto } from "src/common/dto/input.dto";

export class CreateRoleDto extends InputDto {
    @ApiProperty({ type: 'string', title: '名称' })
    name: string;

    @ApiProperty({ type: 'string', title: '别名' })
    alias: string;

    @ApiProperty({ type: 'boolean', title: '状态 1:启用 0:禁用' })
    status: boolean;
}