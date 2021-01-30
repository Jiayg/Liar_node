
import { Injectable, Inject } from '@nestjs/common'
import { User } from '../user/entities'
import { UserService } from '../user/services'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(payload: { id: number }): Promise<User> {
    return await this.userService.findOneById(payload.id)
  }
}
