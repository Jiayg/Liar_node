import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOutDto } from '@/common/basemodel';
import { Repository, Transaction } from 'typeorm';
import { CreateRoleDto, GetPageDto, UpdateRoleDto } from './dto';
import { Role } from './entities';
import { RoleNotFoundException } from './role.error';

@Injectable()
export class RoleService {
    private readonly logger = new Logger("RoleService");
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>
    ) { }

    /**
     *查询所有
     *
     * @return {*}  {Promise<Role[]>}
     * @memberof RoleService
     */
    async findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    /**
     *分页查询所有角色
     *
     * @param {GetPageDto} input
     * @return {*}  {Promise<PageOutDto>}
     * @memberof RoleService
     */
    async findPageList(input: GetPageDto): Promise<PageOutDto> {
        const data = await this.roleRepository
            .createQueryBuilder('role')
            .orderBy({ 'role.create_time': 'DESC' })
            .skip(input.offset * input.limit)
            .take(input.limit)
            .getManyAndCount()
        return { total: data[1], rows: data[0] };
    }

    /**
     *根据id查询详情
     *
     * @param {number} id
     * @return {*}  {Promise<Role>}
     * @memberof RoleService
     */
    async findById(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne(id);
        if (!role)
            throw new RoleNotFoundException();
        return role;
    }

    /**
     *添加
     *
     * @param {CreateRoleDto} roledto
     * @return {*}  {Promise<boolean>}
     * @memberof RoleService
     */
    @Transaction()
    async create(roledto: CreateRoleDto): Promise<boolean> {
        try {
            const role: Role = <Role>roledto;
            await this.roleRepository.save(role);
        } catch (error) {
            this.logger.error("添加角色信息出错:" + error);
            return false;
        }
        return true;
    }

    /**
     *更新
     *
     * @param {UpdateRoleDto} roledto
     * @return {*}  {Promise<boolean>}
     * @memberof RoleService
     */
    async update(roledto: UpdateRoleDto): Promise<boolean> {
        try {
            const role: Role = <Role>roledto;
            await this.roleRepository.update(role.id, role);
        } catch (error) {
            this.logger.error("更新角色信息出错:" + error);
            return false;
        }
        return true;
    }

    /**
     *删除
     *
     * @param {number} id
     * @return {*}  {Promise<boolean>}
     * @memberof RoleService
     */
    async delete(id: number): Promise<boolean> {
        try {
            await this.roleRepository.delete(id);
        } catch (error) {
            this.logger.error("删除角色信息出错:" + error);
            return false;
        }
        return true;
    }

}
