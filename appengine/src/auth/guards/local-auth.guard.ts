import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {

  handleRequest(err, user, info, context) {
    if (err || !user) {

      const body = plainToClass(LoginDto, context.switchToHttp().getRequest().body);
      const errors = validateSync(body);
      if (errors.length) {
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation failed',
          message: errors[0].constraints
        }, HttpStatus.BAD_REQUEST)
      }

      throw err || new UnauthorizedException();
    }
    return user;
  }
}
