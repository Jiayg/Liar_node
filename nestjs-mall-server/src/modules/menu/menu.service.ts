import { PageOutDto } from '@/common/basemodel';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GetPageDto } from '../role/dto';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { Menu } from './entities';


@Injectable()
export class MenuService {
    private readonly logger = new Logger("MenuService");
    constructor(
        @InjectRepository(Menu)
        private readonly menuRepository: Repository<Menu>
    ) { }

    /**
     *查询所有菜单
     *
     * @return {*}  {Promise<Menu[]>}
     * @memberof MenuService
     */
    async findAll(): Promise<Menu[]> {
        return await this.menuRepository.find();
    }

    /**
     *分页查询所有角色
     *
     * @param {GetPageDto} input
     * @return {*}  {Promise<PageOutDto>}
     * @memberof MenuService
     */
    async findPageList(input: GetPageDto): Promise<PageOutDto> {
        const data = await this.menuRepository
            .createQueryBuilder('menu')
            .orderBy({ 'menu.create_time': 'DESC' })
            .skip(input.offset * input.limit)
            .take(input.limit)
            .getManyAndCount()
        return { total: data[1], rows: data[0] };
    }

    /**
     *根据id查询详情
     *
     * @param {number} id
     * @return {*}  {Promise<Menu>}
     * @memberof MenuService
     */
    async findById(id: number): Promise<Menu> {
        return await this.menuRepository.findOne(id);
    }

    /**
     *添加
     *
     * @param {Menu} menu
     * @return {*}  {Promise<boolean>}
     * @memberof MenuService
     */
    async create(dto: CreateMenuDto): Promise<boolean> {
        try {
            const menu: Menu = <Menu>dto;
            await this.menuRepository.save(menu);
        } catch (error) {
            this.logger.error("添加菜单信息出错:" + error);
            return false;
        }
        return true;
    }

    /**
     *更新
     *
     * @param {number} id
     * @param {QueryDeepPartialEntity<Menu>} menu
     * @return {*}  {Promise<boolean>}
     * @memberof MenuService
     */
    async update(dto: UpdateMenuDto): Promise<boolean> {
        try {
            const menu: Menu = <Menu>dto;
            await this.menuRepository.update(menu.id, menu);
        } catch (error) {
            this.logger.error("更新菜单信息出错:" + error);
            return false;
        }
        return true;
    }

    /**
     *删除
     *
     * @param {number} id
     * @return {*}  {Promise<boolean>}
     * @memberof MenuService
     */
    async delete(id: number): Promise<boolean> {
        try {
            await this.menuRepository.delete(id);
        } catch (error) {
            this.logger.error("删除菜单信息出错:" + error);
            return false;
        }
        return true;
    }
}
