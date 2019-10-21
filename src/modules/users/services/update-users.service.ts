import { ITokenResponse } from './../interfaces/token-response.interface';
import { TokenService } from './../../token/services/token.service';
import { UpdateUserDto } from '../dto/update-user-dto-interface';
import { Injectable, HttpService, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { TokenDto } from 'src/modules/token/dto/token.dto';

@Injectable()
export class UpdateUsersService {
    constructor(private readonly tokenService: TokenService, private readonly http: HttpService) {
        //
    }
    update(updateUserDto: UpdateUserDto) {
        console.log("UPDATE USER SERVICE", updateUserDto);
        return this.tokenService.createToken(mapUserDtoToTokenDto(updateUserDto))
            .then((res: ITokenResponse) => {
                this.updateUserAlias(updateUserDto, res);
                this.activatePopSettings(res);
            })
            .catch((err) => {
                throw err;
            });
    }

    private updateUserAlias(updateUserDto: UpdateUserDto, tokenResponse: ITokenResponse) {
        const { body, method, url } = updateUserDto;
        const headers = {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (!['patch', 'post'].includes(method)) {
            const exception = new HttpException('Method in body should be post or patch', HttpStatus.EXPECTATION_FAILED);
            const errorMessage = {
                code: exception.getStatus(),
                message: exception.toString(),
                query: updateUserDto,
            };

            throw errorMessage;
        } else if (method === 'patch') {
            return this.http.patch(url, body, { headers })
                .toPromise();
        } else if (method === 'post') {
            return this.http.post(url, body, { headers })
                .toPromise()
                .catch((err) => Logger.error('ERREUR DU HTTP POST', err));
        }
    }

    private activatePopSettings(tokenResponse: ITokenResponse) {
        const url = `https://www.googleapis.com/gmail/v1/users/me/settings/pop`;
        const headers = {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const body = {
            accessWindow: 'allMail',
            disposition: 'markRead',
        };

        return this.http.put(url, body, { headers })
            .toPromise();
    }
}

function mapUserDtoToTokenDto(updateUserDto: UpdateUserDto): TokenDto {
    return new TokenDto(updateUserDto.primaryEmail);
}
