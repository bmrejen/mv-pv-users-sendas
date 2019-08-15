import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './controllers/token.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { LoggerModule } from './modules/logger.module';
import { UsersModule } from './modules/users.module';
import { TokenModule } from './modules/token.module';
import { TokenService } from './services/token.service';

@Module({
  imports: [LoggerModule, UsersModule, TokenModule],
  controllers: [AppController, UsersController, TokenController],
  providers: [AppService],
})
export class AppModule { }
