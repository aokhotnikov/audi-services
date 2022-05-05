import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { User } from '../user/user.interface';

@Injectable()
export class AuthService {
  constructor(private userSrv: UserService, private jwtSrv: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userSrv.findByUsername(username);
    console.log(user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  getToken(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      jwt_token: this.jwtSrv.sign(payload),
    };
  }
}
