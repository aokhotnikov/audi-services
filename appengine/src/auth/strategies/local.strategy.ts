/**
 * Created by Andrey Okhotnikov on 02.04.20.
 * Email: hunterov1984@gmail.com
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    // `passport-local` has no configuration options, so our constructor simply calls super(), without an options object
    super();
  }

  // "verify callback"
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}