import { UserNotFoundException } from './../user.error';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    // 查询所有
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    // 根据主键id查询
    async findById(id: string): Promise<User> {
        try {
            return await this.userRepository.findOne(id);
        } catch (error) {
            throw new UserNotFoundException();
        }
    }

    // 添加
    async create(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    // 删除
    async remove(id: string): Promise<boolean> {
        await this.userRepository.delete(id);
        return true
    }
}
