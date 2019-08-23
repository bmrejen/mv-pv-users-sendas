import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './modules/token/controllers/token.controller';
import { TokenModule } from './modules/token/token.module';
import { UsersController } from './modules/users/controllers/users.controller';
import { UsersModule } from './modules/users/users.module';
import { UpdateUsersService } from './modules/users/services/update-users.service';

@Module({
  imports: [UsersModule, TokenModule, HttpModule],
  controllers: [AppController, UsersController, TokenController],
  providers: [AppService, UpdateUsersService, UpdateUsersService],
})
export class AppModule {
  //
}
