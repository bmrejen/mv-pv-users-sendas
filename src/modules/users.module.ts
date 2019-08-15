import { TokenModule } from './token.module';
import { Module } from '@nestjs/common';
import { UsersController } from './../controllers/users.controller';
import { UsersService } from './../services/users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [TokenModule],
})
export class UsersModule { }
