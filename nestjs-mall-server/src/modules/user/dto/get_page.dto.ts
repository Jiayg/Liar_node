import { ApiProperty } from "@nestjs/swagger";
import { PageInDto } from "@/common/basemodel";

export class GetPageDto extends PageInDto {
    @ApiProperty({ title: '用户名称' })
    name?: string
}