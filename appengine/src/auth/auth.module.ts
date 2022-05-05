import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      // imports: [ConfigModule],   //  not necessary because ConfigModule has property isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configSrv: ConfigService) => ({
        secret: configSrv.get('jwt.secret'),
        signOptions: { expiresIn: configSrv.get('jwt.expires_in') },
      })
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
