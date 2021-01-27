
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/user/entities';

@Injectable()
export class AdminAccessGuard extends AuthGuard('jwt_admin') {
  constructor(
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch (e) {
      throw e;
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const admin: User = request.user;
    if (!roles && admin) {
      return true
    }
    const hasRole = admin.role.includes(roles[0]);
    return admin && admin.role && hasRole;
  }
}
