import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Menu } from '../entities';

@Injectable()
export class MenuService {
    constructor(
        // @InjectRepository(Menu)
        // private readonly menuRepository: Repository<Menu>
    ) { }

    // // 查询所有菜单
    // async findAll(): Promise<Menu[]> {
    //     return await this.menuRepository.find();
    // }

    // // 根据id查询详情
    // async findById(id: string): Promise<Menu> {
    //     return await this.menuRepository.findOne(id);
    // }

    // // 添加
    // async create(menu: Menu): Promise<Menu> {
    //     return await this.menuRepository.save(menu);
    // }

    // // 更新
    // async update(id: string, menu: QueryDeepPartialEntity<Menu>): Promise<UpdateResult> {
    //     return await this.menuRepository.update(id, menu);
    // }

    // // 删除
    // async delete(id: string): Promise<DeleteResult> {
    //     return await this.menuRepository.delete(id);
    // }
}
