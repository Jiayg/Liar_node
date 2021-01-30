import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { UserNotFoundException } from '../user.error';
import { CreateUserDto, GetPageDto, UpdateUserDto } from '../dto';
import { PageOutDto } from '@/common/basemodel';

@Injectable()
export class UserService {
  private readonly logger = new Logger("RoleService");
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  /**
   *查询所有用户
   *
   * @return {*}  {Promise<User[]>}
   * @memberof UserService
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   *分页查询所有角色
   *
   * @param {GetPageDto} input
   * @return {*}  {Promise<PageOutDto>}
   * @memberof RoleService
   */
  async findPageList(input: GetPageDto): Promise<PageOutDto> {
    const data = await this.userRepository
      .createQueryBuilder('user')
      .orderBy({ 'user.create_time': 'DESC' })
      .skip(input.offset * input.limit)
      .take(input.limit)
      .getManyAndCount()
    return { total: data[1], rows: data[0] };
  }

  /**
   *创建用户
   *
   * @param {User} dto
   * @return {*}  {Promise<any>}
   * @memberof UserService
   */
  async create(dto: CreateUserDto): Promise<boolean> {
    try {
      const user: User = <User>dto;
      await this.userRepository.save(user);
    } catch (error) {
      this.logger.error("创建用户信息出错:" + error);
      return false;
    }
    return true;
  }

  /**
   *更新
   *
   * @param {UpdateRoleDto} dto
   * @return {*}  {Promise<boolean>}
   * @memberof RoleService
   */
  async update(dto: UpdateUserDto): Promise<boolean> {
    try {
      const user: User = <User>dto;
      await this.userRepository.update(user.id, user);
    } catch (error) {
      this.logger.error("更新用户信息出错:" + error);
      return false;
    }
    return true;
  }
  /**
   *修改账户密码
   *
   * @param {string} id
   * @param {string} password
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async changePwd(id: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    user.password = password;
    return await this.userRepository.save(user);
  }

  /**
   *根据主键id查询
   *
   * @param {number} id
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
  async findOneById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  /**
   *根据账户邮箱查询
   *
   * @param {string} username
   * @return {*}  {Promise<User>}
   * @memberof UserService
   */
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

    /**
     *删除
     *
     * @param {number} id
     * @return {*}  {Promise<boolean>}
     * @memberof RoleService
     */
    async delete(id: number): Promise<boolean> {
      try {
          await this.userRepository.delete(id);
      } catch (error) {
          this.logger.error("删除用户信息出错:" + error);
          return false;
      }
      return true;
  }

}
