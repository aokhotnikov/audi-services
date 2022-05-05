/**
 * Created by Andrey Okhotnikov on 02.04.20.
 * Email: hunterov1984@gmail.com
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private configSrv: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configSrv.get('jwt.secret'),
    });
  }

  // "verify callback"
  async validate(payload: {[k:string]: any}): Promise<any> {
    return { id: payload.id, username: payload.username };
  }
}