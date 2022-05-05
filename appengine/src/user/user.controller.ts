import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {

  constructor(private userSrv: UserService) { }

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.userSrv.findByUserId(req.user.id);
    const { password, ...result } = user;
    return result;
  }
}
