import { TokenService } from './../services/token.service';
import { TokenController } from './../controllers/token.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [TokenController],
    providers: [TokenService],
})
export class TokenModule { }
