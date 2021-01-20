import { UserService } from '../services/user.service';
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: '查询全部用户' })
    async getAll() {
        return this.userService.findAll();
    }

    @Get('c')
    @ApiOperation({ summary: 'test' })
    async getc() {
        return process.env.TEST
    }
}
