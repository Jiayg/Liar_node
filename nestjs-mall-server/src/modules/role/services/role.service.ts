import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Role } from '../entities/role.entity';
import { GetPageDto } from '../dto/get_page.dto';
import { PageOutDto } from 'src/common/dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }

    // 查询所有角色
    async findAll(input: GetPageDto): Promise<PageOutDto> {
        const data = await this.roleRepository
            .createQueryBuilder('role')
            .orderBy({ 'role.create_time': 'DESC' })
            .skip((input.offset - 1) * input.limit)
            .take(input.limit)
            .getManyAndCount()
        return { total: data[1], rows: data[0] };
    }

    // 根据id查询详情
    async findById(id: string): Promise<Role> {
        return await this.roleRepository.findOne(id);
    }

    // 添加
    async create(role: Role): Promise<Role> {
        return await this.roleRepository.save(role);
    }

    // 更新
    async update(id: string, role: QueryDeepPartialEntity<Role>): Promise<UpdateResult> {
        return await this.roleRepository.update(id, role);
    }

    // 删除
    async delete(id: string): Promise<DeleteResult> {
        return await this.roleRepository.delete(id);
    }
}
