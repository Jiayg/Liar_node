import {
  UserNotConfiguredMenuException,
  UserNotFoundException,
  WrongPasswordException,
} from '../user.error';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from '../dto/sign_in.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  // 添加
  async create(user: User): Promise<any> {
    if (user.role.length < 0) {
      throw new UserNotConfiguredMenuException();
    }
    return await this.userRepository.save(user);
  }

  // 修改密码
  async changePwd(id: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    user.password = password;
    return await this.userRepository.save(user);
  }

  // 删除
  async remove(id: string): Promise<boolean> {
    return (await (await this.userRepository.delete(id)).raw) > 0;
  }

  // 查询所有
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // 根据主键id查询
  async findOneById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  // 根据账户查询
  async findOneByUserName(username: string): Promise<User> {
    try {
      const model = await this.userRepository.findOne({ username });
      if (!model) {
        throw new UserNotFoundException();
      }
      return model;
    } catch (error) {
      throw new UserNotFoundException();
    }
  }
}
