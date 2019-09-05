import { TokenService } from './../services/token.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TokenDto } from '../dto/token.dto';

@Controller('token')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {
        //
    }

    @Post()
    async createToken(@Body() tokenDto: TokenDto): Promise<any> {
        return this.tokenService.createToken(tokenDto);
    }
}
