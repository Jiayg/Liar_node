import { User } from 'src/modules/user/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserTokenService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    async create(user: User) {
        const signString = sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },

            this.createSecretKey(user),
            {
                expiresIn: this.configService.get('JWT_EXPIRATION_DELTA')
            }
        );
        return signString;
    }

    createSecretKey(user: User) {
        return (this.configService.get('JWT_SECRET_KEY') + (user ? '$' + user.id : ''));
    }
}
