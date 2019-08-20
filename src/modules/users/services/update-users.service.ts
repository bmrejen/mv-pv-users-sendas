import { TokenService } from './../../token/services/token.service';
import { IUpdateUserDto } from '../dto/update-user-dto-interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UpdateUsersService {
    constructor(private readonly tokenService: TokenService) {
        //
    }
    update(updateUserDto: IUpdateUserDto) {
        Logger.log(updateUserDto);
        return this.tokenService.createToken(updateUserDto);
    }
}
