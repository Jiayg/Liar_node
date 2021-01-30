import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import { Repository } from 'typeorm';
import { SignInDto } from '../dto/sign_in.dto';
import { User } from '../entities';
import { UserDisableException, UserNotFoundException, WrongPasswordException } from '../user.error';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly cryptoUtil: CryptoUtil
    ) { }

    // 登录
    async login(dto: SignInDto): Promise<Record<string, unknown>> {
        const user = await this.userRepository.findOne({ username: dto.email });
        if (!user) throw new UserNotFoundException();
        if (!user.status) throw new UserDisableException()
        if (!this.cryptoUtil.checkPassword(dto.password, user.password)) throw new WrongPasswordException();
        return await this.createToken({ id: user.id })
    }

    /**
     * 生成 token
     * @param payload { id: string }
     */
    async createToken(payload: { id: number }): Promise<Record<string, unknown>> {
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('JWT_REFRESHEXPIRESIN') })
        return { accessToken, refreshToken }
    }

    // 刷新token
    async refreshToken(id: number): Promise<Record<string, unknown>> {
        return this.createToken({ id })
    }

    // 验证token
    async verifyToken(token: string): Promise<number> {
        try {
            const { id } = this.jwtService.verify(token)
            return id
        } catch (error) {
            return 0
        }
    }

}
