import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from '../dto/sign_in.dto';
import { User } from '../entities';
import { UserNotFoundException, WrongPasswordException } from '../user.error';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        // private readonly cryptoUtil: CryptoUtil,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService
    ) { }

    // 登录
    async login(option: SignInDto): Promise<Record<string, unknown>> {
        const user = await this.userRepository.findOne({ username: option.email });
        if (!user) {
            throw new UserNotFoundException();
        }
        if (user.password != option.password) {
            throw new WrongPasswordException();
        }
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
