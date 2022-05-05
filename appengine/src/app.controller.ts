import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {
    console.log('GOOGLE_CLOUD_PROJECT: ' + configService.get('GOOGLE_CLOUD_PROJECT'));
    console.log('SERVICE_ACCOUNT: ' + configService.get('KEY_FILENAME'));
    console.log('NODE_ENV: ' + configService.get('NODE_ENV'));
    console.log('PORT: ' + configService.get('PORT'));
    console.log('URL PREFIX: ' + configService.get('PREFIX'));
    console.log('JWT secret: ' + configService.get('jwt.secret'));
    console.log('JWT expires_in: ' + configService.get('jwt.expires_in'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
