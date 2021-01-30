import { Menu } from './entities/menu.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/common/decorators'
import { MenuService } from './menu.service';
import { PageOutDto } from '@/common/basemodel';
import { CreateMenuDto, GetPageDto, UpdateMenuDto } from './dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '@/common/guards';

@ApiBearerAuth()
@ApiTags('菜单管理')
@Controller('menu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuController {
    constructor(
        private readonly menuService: MenuService
    ) { }

    /**
     *查询所有菜单
     *
     * @return {*}  {Promise<Menu[]>}
     * @memberof MenuController
     */
    @Get('all')
    @Permissions('sys_menu:all')
    @ApiOperation({ summary: '查询所有菜单' })
    async getAllList(): Promise<Menu[]> {
        return this.menuService.findAll();
    }

    /**
     *分页查询所有菜单
     *
     * @param {GetPageDto} query
     * @return {*}  {Promise<PageOutDto>}
     * @memberof MenuController
     */
    @Get()
    @Permissions('sys_menu:list')
    @ApiOperation({ summary: '分页查询所有菜单' })
    async getPageList(@Query() query: GetPageDto): Promise<PageOutDto> {
        return this.menuService.findPageList(query);
    }

    /**
     *查询菜单详情
     *
     * @param {number} id
     * @return {*}  {Promise<Role>}
     * @memberof RoleController
     */
    @Get(':id')
    @Permissions('sys_menu:detail')
    @ApiOperation({ summary: '查询菜单详情' })
    async getDetail(@Param('id') id: number): Promise<Menu> {
        return await this.menuService.findById(id);
    }

    /**
     *保存菜单信息
     *
     * @param {CreateRoleDto} dto
     * @return {*}  {Promise<boolean>}
     * @memberof RoleController
     */
    @Post()
    @Permissions('sys_menu:add')
    @ApiOperation({ summary: '保存菜单信息' })
    async create(@Body() dto: CreateMenuDto): Promise<boolean> {
        return this.menuService.create(dto)
    }

    /**
     *更新菜单信息
     *
     * @param {UpdateRoleDto} dto
     * @return {*}  {Promise<boolean>}
     * @memberof RoleController
     */
    @Put(':id')
    @Permissions('sys_menu:upd')
    @ApiOperation({ summary: '更新菜单信息' })
    async update(@Body() dto: UpdateMenuDto): Promise<boolean> {
        return this.menuService.update(dto)
    }

    /**
     *删除菜单信息
     *
     * @param {number} id
     * @return {*}  {Promise<boolean>}
     * @memberof RoleController
     */
    @Delete(':id')
    @Permissions('sys_menu:del')
    @ApiOperation({ summary: '删除菜单信息' })
    async delete(@Param('id') id: number): Promise<boolean> {
        return await this.menuService.delete(id);
    }
}
