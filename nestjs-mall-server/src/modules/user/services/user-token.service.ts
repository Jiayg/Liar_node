import { User } from 'src/modules/user/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { decode, sign, verify } from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class UserTokenService {
  constructor(private readonly configService: ConfigService) { }

  async create(user: User) {
    const signString = sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },

      this.createSecretKey(user),
      {
        expiresIn: this.configService.get('JWT_EXPIRATION_DELTA'),
      },
    );
    return signString;
  }

  validate(token: string) {
    const data: any = this.decode(token);
    return verify(this.removeHeaderPrefix(token), this.createSecretKey(data));
  }

  decode(token: string) {
    return decode(this.removeHeaderPrefix(token)) as IJwtPayload;
  }

  removeHeaderPrefix(token: string) {
    const authHeaderPrefix = this.configService.get('JWT_AUTH_HEADER_PREFIX');
    return authHeaderPrefix &&
      token &&
      token.split(authHeaderPrefix + ' ').length > 1
      ? token.split(authHeaderPrefix + ' ')[1]
      : token;
  }

  extractTokenFromRequest(request) {
    const authorizationHeader = request.headers.authorization
      ? String(request.headers.authorization)
      : null;
    const token = this.removeHeaderPrefix(authorizationHeader);
    return token;
  }

  createSecretKey(user: User) {
    return (
      this.configService.get('JWT_SECRET_KEY') + (user ? '$' + user.id : '')
    );
  }
}
