import { UpdateUsersService } from './services/update-users.service';
import { TokenModule } from '../token/token.module';
import { Module, HttpModule } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, UpdateUsersService],
    imports: [TokenModule, HttpModule],
    exports: [UsersService, UpdateUsersService],
})
export class UsersModule { }
