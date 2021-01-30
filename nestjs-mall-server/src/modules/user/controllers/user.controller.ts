import { Controller, Get, UseGuards, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Logger } from "@nestjs/common";
import { RolesGuard } from 'src/common/guards/role.guard';
import { UserService } from '../services/user.service';
import { JwtAuthGuard } from 'src/modules/auth/auth.guard';
import { Permissions } from 'src/common/decorators'
import { User } from '../entities';

@ApiBearerAuth()
@ApiTags('用户管理')
@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  private readonly logger = new Logger("UserController");
  constructor(private readonly userService: UserService) { }

  @Get()
  @Permissions('sys_user:all')
  @ApiOperation({ summary: '查询所有用户' })
  async getAllList() {
    return this.userService.findAll();
  }

  // @Get()
  // @Permissions('sys_user:list')
  // @ApiOperation({ summary: '分页查询所有用户' })
  // async getPageList(@Query() query: GetPageDto): Promise<PageOutDto> {
  //     return this.userService.findpagelist(query);
  // }

  @Get(':id')
  @Permissions('sys_user:detail')
  @ApiOperation({ summary: '查询用户详情' })
  async getDetail(@Param('id') id: number): Promise<User> {
    return await this.userService.findOneById(id);
  }

  // @Post()
  // @Permissions('sys_user:add')
  // @ApiOperation({ summary: '保存用户信息' })
  // async create(@Body() dto: CreateRoleDto): Promise<boolean> {
  //     return this.userService.create(dto)
  // }

  // @Put()
  // @Permissions('sys_user:upd')
  // @ApiOperation({ summary: '更新用户信息' })
  // async update(@Body() dto: UpdateRoleDto): Promise<boolean> {
  //     return this.userService.update(dto)
  // }

  @Delete(':id')
  @Permissions('sys_user:del')
  @ApiOperation({ summary: '保存用户信息' })
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.userService.delete(id);
  }

  @Get('env')
  @ApiOperation({ summary: '当前开发环境' })
  async getc() {
    this.logger.error('error');
    this.logger.log('log');
    this.logger.debug('debug');
    this.logger.warn('warn');
    return process.env.NODE_ENV;
  }
}
