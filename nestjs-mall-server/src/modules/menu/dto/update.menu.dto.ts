import { ApiProperty } from "@nestjs/swagger";
import { InputDto } from "@/common/basemodel/input.dto";

export class UpdateMenuDto extends InputDto {
    @ApiProperty({ type: 'string', title: '名称' })
    name: string;
}