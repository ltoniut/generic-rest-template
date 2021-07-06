import { Injectable } from '@nestjs/common';
import { UsersService, User } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(payload: { sub: string }): Promise<User> {
    const { sub } = payload;
    const user = await this.usersService.findOne(sub);

    if (user) {
      return user;
    }

    return null;
  }
}
