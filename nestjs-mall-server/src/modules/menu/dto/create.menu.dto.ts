import { ApiProperty } from "@nestjs/swagger";
import { InputDto } from "@/common/basemodel/input.dto";

export class CreateMenuDto extends InputDto {
    @ApiProperty({ type: 'string', title: '名称' })
    name: string;
}