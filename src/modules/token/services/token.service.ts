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
            iss: '370957812504-m0eophjpraff16mbnloc330bq7jkm6up@developer.gserviceaccount.com',
            // tslint:disable-next-line
            scope: 'https://mail.google.com https://www.googleapis.com/auth/admin.directory.group https://www.googleapis.com/auth/admin.directory.orgunit https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.settings.basic https://www.googleapis.com/auth/gmail.settings.sharing',
            sub: primaryEmail,
        };

        // Sign JWT
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);

        // tslint:disable-next-line
        const privateKey = '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCktko8W7B/J6+l\nDQooHSH+IIq6tAIWPKSYjhON4NYD7XTHhSDgcW1qGvaMorPhS2k/UbeR0J3hBzJr\nSuBNLMa9XiHLZ+n8Z3f0j2UBO3QQwSOejSvf38LnloWtV20LY2njAW/9pNys6f9w\njMQSVIBwBOgnBC6UebzNVMsVAq5zm0zBGDIlInUPYP7NQkt5TI+eYsmuveULmm6Q\ntehf6M7krGu958nK207Y3dpvgiZR59mBpwlni9EwOq+zbjL3XC8bUA0ODUcorrxx\nQ8WJ+Mx9aE8nBXdjDz8EfFcD+6ccotwbbsiTFmUv56cLaa1kfj4cmA+me0wC8vBg\nnaHIR/aJAgMBAAECgf9HMb74a5WtOSGVGGZpBAdBFc/NbXdSEZWJvbgsLuU/CG5A\nbPIhmzRXUAF8tK+VlJakgvK4McypqMtTgU7BSAWy+/M9FfJSbBgBHYPjq9jrjGin\nxw6cIjl1Vsu/3Dtjf4snsW2FjcbogIsGX/lMaSZWCfBOnjs1QPNQ4RDmvxC8XQpy\nXuHU+sD8vBiZpclgaF2R1mf8nNfZbPCHiZws8B7Y1PhWLvutGlVdEAjMbJuMVkXP\nbmnuWh9MdL7FGZdWEola27mPkDpZSYy/Dr0ghOV9puKbZNP3wgDkWsHkw848ndFk\nfYV31g4eT7ByXbLKLuyjEnqaRDsa26D0s2epfukCgYEA4e8EAL4grLhmG+xRveci\ng5HoXVFZRVgInplsONpu1M2mXIBtWWDfVycblVkM5d1Ohd/n1Pw3fEdfK/hg2ymg\nofGVRVpYQP73NJMw1rTa5kcWRsG+YDAi4ostExlXI2rnlbnUoIuEerEzHtj4Wh9A\nPWAzBrRi8f87YTp2TDrqikUCgYEAuqGcX+p8YO5dMi/s5lGPGprptMHmCmOqU2gr\nYEectOoytOPJEiaxd7pGSa4W4ao0euNMnKsMT6q+wtRqBvpg/t8jrsvdu4hbq2Hf\nzZI6lgRKOOoawAzRjiKGcbOwgsz2UjHoIB4OWO/ujFDsrIO2yhJypdxZg/SQC3E0\nHRligXUCgYEAnnJqQz8TWS4E5iZIeT7ElLLZ27/2NEx11wxPultuCK2ksxCaH2lx\nmARkMsv94KLgs8CALH0pSG4hT4vkGS9LaOcswTOH2yU0JtnnEVxKe950v/CV241G\nmcvzM4a89qi9euKVPHY71XO6HzMYkNOD0MdLYbNWBNLzSM+gMPvMimUCgYAfcRSo\nMBfuOJoo11wg3UKvp8ORuUzpGStby+Pq34WuEPqj8PAyB6TEV/R5e0PNluAqh9qj\nVknHritfJWwLaukmZy9axmu/qVRQRjfvKSCHn4dlmUMScdZoDLb7ttsY3jDtXg0O\nRCIEp79XkladJb+IwZzhBoNqMKyH0PWHpXwr9QKBgB7YGcXYy8XFW0kwpcu7lSVz\np6dROafSMk4QMljHo8yila1I0Z/TOmHalFhn9Wsafdg4JoYy12Z7OPkngCurhWv9\nCGPf4Q2/Cex5bUsjI67oUTeEkP4+a1BDDqEiUyvmQVWiE5rJZR3WsWK6jpDdHin9\nsyFa9YbHVlwpSCna8LSn\n-----END PRIVATE KEY-----\n';

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
