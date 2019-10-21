import { CreateUserDto } from '../dto/create-user-dto-interface';
import { IUserConfig } from '../interfaces/user-config.interface';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../models/user.model';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {

    create(user: CreateUserDto) {
        const usr = new User(mapFromApi(user));
        const jsonString = JSON.stringify(usr);

        const fileName = path.join(__dirname, '../../../../jobs', `${Date.now().toString()}.json`);

        fs.writeFile(fileName, jsonString, (err) => Logger.log(err));
        Logger.log(jsonString);

        return usr;
    }
}

function mapFromApi(data: CreateUserDto): IUserConfig {
    return {
        body: data.body,
        method: data.method,
        primaryEmail: data.primaryEmail,
        url: data.url,
    };
}
