import { ApiProperty } from "@nestjs/swagger";
import { PageInDto } from "@/common/basemodel";

export class GetPageDto extends PageInDto {
    @ApiProperty({ title: '菜单名称' })
    name?: string
}