import { Get, HttpCode, HttpStatus, Logger, Query } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetPageDto } from '../dto/get_page.dto';
import { RoleService } from '../services/role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
    private readonly logger = new Logger("RoleController");
    constructor(
        private readonly roleService: RoleService
    ) { }

    @Get()
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '查询所有角色' })
    @ApiOkResponse({ description: '返回角色列表和角色总数' })
    async getAll(@Query() query: GetPageDto) {
        return this.roleService.findAll(query);
    }


}
