import { HttpModule, Module } from '@nestjs/common';
import { TokenService } from './../services/token.service';
import { TokenController } from './../controllers/token.controller';

@Module({
    imports: [HttpModule.register({
        timeout: 5000,
        maxRedirects: 5,
    }) ],
    controllers: [TokenController],
    providers: [TokenService],
    exports: [TokenService],
})
export class TokenModule { }
