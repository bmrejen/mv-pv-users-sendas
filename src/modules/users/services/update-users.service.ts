import { ITokenResponse } from './../interfaces/token-response.interface';
import { TokenService } from './../../token/services/token.service';
import { UpdateUserDto } from '../dto/update-user-dto-interface';
import { Injectable, HttpService, HttpException, HttpStatus } from '@nestjs/common';
import { TokenDto } from 'src/modules/token/dto/token.dto';

@Injectable()
export class UpdateUsersService {
    constructor(private readonly tokenService: TokenService, private readonly http: HttpService) {
        //
    }
    update(updateUserDto: UpdateUserDto) {
        return this.tokenService.createToken(mapUserDtoToTokenDto(updateUserDto))
            .then((res) => this.updateUserAlias(updateUserDto, res))
            .catch((err) => {
                // console.log("CATCH UPDATE", err.response);
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
            console.log("method ", method);
            console.log("headers ", headers);
            console.log("body ", body);
            console.log("url ", url);

            return this.http.patch(url, body, { headers })
                .toPromise();
        } else if (method === 'post') {
            console.log("method ", method);
            console.log("headers ", headers);
            console.log("body ", body);
            console.log("url ", url);
            return this.http.post(url, body, { headers })
                .toPromise()
                .catch((err) => console.error("ERREUR DU HTTP POST", err));
        }
    }
}

function mapUserDtoToTokenDto(updateUserDto: UpdateUserDto): TokenDto {
    return new TokenDto(updateUserDto.primaryEmail);
}
