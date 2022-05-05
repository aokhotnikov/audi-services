import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { VehiclesModule } from './vehicles/vehicles.module';
import { LoggerMiddleware } from './common/logger.middleware';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehicleStatesModule } from './vehicle-states/vehicle-states.module';
import { VehicleStatesController } from './vehicle-states/vehicle-states.controller';
import configuration from './config/configuration';

@Module({
  imports: [
    AuthModule,
    UserModule,
    VehiclesModule,
    VehicleStatesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `environment/${process.env.NODE_ENV}.env`,
      load: [configuration(process.env.NODE_ENV)]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(VehiclesController, VehicleStatesController, UserController);
  }
}