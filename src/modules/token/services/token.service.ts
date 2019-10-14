import { Keys } from './../../../keys';
import { Injectable, Body, HttpService, Logger } from '@nestjs/common';
import { TokenDto } from 'src/modules/token/dto/token.dto';

import * as fs from 'fs';
import * as jwt from 'jsrsasign';
import * as path from 'path';

import { ITokenResponse } from 'src/modules/users/interfaces/token-response.interface';

@Injectable()
export class TokenService {
    public accessToken: any;
    constructor(private readonly http: HttpService) {
        //
    }

    async createToken(@Body() tokenDto: TokenDto): Promise<ITokenResponse> {
        const primaryEmail = tokenDto.primaryEmail;
        this.accessToken = null;

        // Header
        const oHeader = { alg: 'RS256', typ: 'JWT' };
        // Payload
        const oPayload = {
            aud: 'https://www.googleapis.com/oauth2/v4/token/',
            exp: jwt.KJUR.jws.IntDate.get('now + 1hour'),
            iat: jwt.KJUR.jws.IntDate.get('now'),
            iss: Keys.getIss(),
            // tslint:disable-next-line
            scope: 'https://mail.google.com https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.orgunit https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.settings.basic https://www.googleapis.com/auth/gmail.settings.sharing',
            sub: primaryEmail,
        };

        // Sign JWT
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);

        // tslint:disable-next-line
        const privateKey = Keys.getPrivateKey();

        const sJWT = jwt.KJUR.jws.JWS.sign('RS256', sHeader, sPayload, privateKey);

        const url = 'https://www.googleapis.com/oauth2/v4/token/';
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        const body = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${sJWT}`;

        return this.http.post(url, body, { headers })
            .toPromise()
            .then((res: { data: ITokenResponse }) => {
                this.accessToken = res.data.access_token;
                return res.data;
            })
            .catch((err) => {
                const fileName = path.join(__dirname, '../../../../logs/create-token.log');
                fs.appendFile(fileName, JSON.stringify(err), (error) => Logger.log(error));
                return err;
            });
    }
}
