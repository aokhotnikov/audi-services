import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const { method, originalUrl, hostname, protocol } = req;
    console.log(`${method} ${protocol}://${hostname}${originalUrl}`);
    next();
  }
}
