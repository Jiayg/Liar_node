import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOutDto } from '@/common/basemodel';
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

    /**
     *查询所有角色
     *
     * @return {*}
     * @memberof RoleController
     */
    @Get('all')
    @Permissions('sys_role:all')
    @ApiOperation({ summary: '查询所有角色' })
    async getAllList(): Promise<Role[]> {
        return this.roleService.findAll();
    }

    /**
     *分页查询所有角色
     *
     * @param {GetPageDto} query
     * @return {*}  {Promise<PageOutDto>}
     * @memberof RoleController
     */
    @Get()
    @Permissions('sys_role:list')
    @ApiOperation({ summary: '分页查询所有角色' })
    async getPageList(@Query() query: GetPageDto): Promise<PageOutDto> {
        return this.roleService.findPageList(query);
    }

    /**
     *查询角色详情
     *
     * @param {number} id
     * @return {*}  {Promise<Role>}
     * @memberof RoleController
     */
    @Get(':id')
    @Permissions('sys_role:detail')
    @ApiOperation({ summary: '查询角色详情' })
    async getDetail(@Param('id') id: number): Promise<Role> {
        return await this.roleService.findById(id);
    }

    /**
     *保存角色信息
     *
     * @param {CreateRoleDto} dto
     * @return {*}  {Promise<boolean>}
     * @memberof RoleController
     */
    @Post()
    @Permissions('sys_role:add')
    @ApiOperation({ summary: '保存角色信息' })
    async create(@Body() dto: CreateRoleDto): Promise<boolean> {
        return this.roleService.create(dto)
    }

    /**
     *更新角色信息
     *
     * @param {UpdateRoleDto} dto
     * @return {*}  {Promise<boolean>}
     * @memberof RoleController
     */
    @Put(':id')
    @Permissions('sys_role:upd')
    @ApiOperation({ summary: '更新角色信息' })
    async update(@Body() dto: UpdateRoleDto): Promise<boolean> {
        return this.roleService.update(dto)
    }

    /**
     *删除角色信息
     *
     * @param {number} id
     * @return {*}  {Promise<boolean>}
     * @memberof RoleController
     */
    @Delete(':id')
    @Permissions('sys_role:del')
    @ApiOperation({ summary: '删除角色信息' })
    async delete(@Param('id') id: number): Promise<boolean> {
        return await this.roleService.delete(id);
    }
}
