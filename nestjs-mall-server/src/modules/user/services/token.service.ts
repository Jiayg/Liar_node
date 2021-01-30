import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CryptoUtil } from '@/common/utils/crypto.util';
import { SignInDto } from '../dto/sign_in.dto';
import { User } from '../entities';
import {
    UserDisableException,
    UserNotFoundException,
    WrongPasswordException
} from '../user.error';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly cryptoUtil: CryptoUtil
    ) { }

    /**
     *用户登录
     *
     * @param {SignInDto} dto
     * @return {*}  {Promise<Record<string, unknown>>}
     * @memberof TokenService
     */
    async login(dto: SignInDto): Promise<Record<string, unknown>> {
        const user = await this.userRepository.findOne({ username: dto.email });
        if (!user) throw new UserNotFoundException();
        if (!user.status) throw new UserDisableException()
        if (!this.cryptoUtil.checkPassword(dto.password, user.password)) throw new WrongPasswordException();
        return await this.createToken({ id: user.id })
    }

    /**
     *根据ID生成token
     *
     * @param {{ id: number }} payload
     * @return {*}  {Promise<Record<string, unknown>>}
     * @memberof TokenService
     */
    async createToken(payload: { id: number }): Promise<Record<string, unknown>> {
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('JWT_REFRESHEXPIRESIN') })
        return { accessToken, refreshToken }
    }

    /**
     *刷新token
     *
     * @param {number} id
     * @return {*}  {Promise<Record<string, unknown>>}
     * @memberof TokenService
     */
    async refreshToken(id: number): Promise<Record<string, unknown>> {
        return this.createToken({ id })
    }

    /**
     *验证token是否过期
     *
     * @param {string} token
     * @return {*}  {Promise<number>}
     * @memberof TokenService
     */
    async verifyToken(token: string): Promise<number> {
        try {
            const { id } = this.jwtService.verify(token)
            return id
        } catch (error) {
            return 0
        }
    }

}
