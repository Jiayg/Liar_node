
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-jwt';
import { User } from '../entities';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { UserTokenService } from '../services/user-token.service';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'jwt_admin') {
  constructor(
    private readonly tokenService: UserTokenService
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: req => {
        const token = this.tokenService.extractTokenFromRequest(req);
        return token
      },
      secretOrKeyProvider: (req, token, done) => {
        const secretKey = this.tokenService.createSecretKey(
          plainToClass(User, this.tokenService.decode(token))
        );
        done(null, secretKey);
      }
    });
  }

  public async validate(req, payload: IJwtPayload, done) {
    try {
      const user = plainToClass(User, payload);
      done(null, user);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
