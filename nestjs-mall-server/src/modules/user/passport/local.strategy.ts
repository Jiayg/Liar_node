import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../services';
import { UserNotFoundException } from '../user.error';

@Injectable()
export class LocalStrategySignIn extends PassportStrategy(Strategy, 'admin_sign') {
  constructor(private readonly usersService: UserService) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  public async validate(req, email: string, password: string) {
    return await this.usersService.signIn({
      email,
      password
    });
  }
}
