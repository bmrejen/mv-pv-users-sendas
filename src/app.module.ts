import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './modules/token/controllers/token.controller';
import { TokenModule } from './modules/token/token.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './modules/logger/logger.module';
import { UpdateUsersService } from './modules/users/services/update-users.service';
import { UserLoggerMiddleware } from './modules/users/logger-middleware/user-logger.middleware';
@Module({
  imports: [LoggerModule, UsersModule, TokenModule],
  controllers: [AppController, UsersController, TokenController],
  providers: [AppService, UpdateUsersService, UpdateUsersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserLoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.PATCH });
  }
}
