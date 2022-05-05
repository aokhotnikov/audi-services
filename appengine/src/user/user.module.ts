import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { CloudModule } from '../cloud/cloud.module';
import { UserController } from './user.controller';

@Module({
  providers: [
    UserService
  ],
  imports: [
    CloudModule
  ],
  exports: [
    UserService
  ],
  controllers: [UserController]
})
export class UserModule {}
