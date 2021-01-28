import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Relation } from '../entities';

@Injectable()
export class RelationService {
    constructor(
        // @InjectRepository(Relation)
        // private readonly menuRepository: Repository<Relation>
    ) { }

    // // 查询所有关系
    // async findAll(): Promise<Relation[]> {
    //     return await this.menuRepository.find();
    // }

    // // 根据id查询详情
    // async findById(id: string): Promise<Relation> {
    //     return await this.menuRepository.findOne(id);
    // }

    // // 添加
    // async create(menu: Relation): Promise<Relation> {
    //     return await this.menuRepository.save(menu);
    // }

    // // 更新
    // async update(id: string, menu: QueryDeepPartialEntity<Relation>): Promise<UpdateResult> {
    //     return await this.menuRepository.update(id, menu);
    // }

    // // 删除
    // async delete(id: string): Promise<DeleteResult> {
    //     return await this.menuRepository.delete(id);
    // }
}
