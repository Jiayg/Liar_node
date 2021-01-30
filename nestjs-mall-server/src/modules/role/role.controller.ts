import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOutDto } from 'src/common/dto';
import { RolesGuard } from 'src/common/guards';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateRoleDto, GetPageDto, UpdateRoleDto } from './dto';
import { Role } from './entities';
import { RoleService } from './role.service';
import { Permissions } from 'src/common/decorators'

@ApiBearerAuth()
@ApiTags('角色管理')
@Controller('role')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    @Permissions('sys_role:all')
    @ApiOperation({ summary: '查询所有角色' })
    async getAllList() {
        return this.roleService.findall();
    }

    @Get()
    @Permissions('sys_role:list')
    @ApiOperation({ summary: '分页查询所有角色' })
    async getPageList(@Query() query: GetPageDto): Promise<PageOutDto> {
        return this.roleService.findpagelist(query);
    }

    @Get(':id')
    @Permissions('sys_role:detail')
    @ApiOperation({ summary: '查询角色详情' })
    async getDetail(@Param('id') id: number): Promise<Role> {
        return await this.roleService.findById(id);
    }

    @Post()
    @Permissions('sys_role:add')
    @ApiOperation({ summary: '保存角色信息' })
    async create(@Body() dto: CreateRoleDto): Promise<boolean> {
        return this.roleService.create(dto)
    }

    @Put()
    @Permissions('sys_role:upd')
    @ApiOperation({ summary: '更新角色信息' })
    async update(@Body() dto: UpdateRoleDto): Promise<boolean> {
        return this.roleService.update(dto)
    }

    @Delete(':id')
    @Permissions('sys_role:del')
    @ApiOperation({ summary: '保存角色信息' })
    async delete(@Param('id') id: number): Promise<boolean> {
        return await this.roleService.delete(id);
    }
}
