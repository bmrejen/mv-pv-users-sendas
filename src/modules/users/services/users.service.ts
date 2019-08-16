import { IUserDataFromApi } from '..//interfaces/user-data-from-api.interface';
import { IUserConfig } from '../interfaces/user-config.interface';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(user: IUserDataFromApi): User[] {
        const usr = new User(mapFromApi(user));
        this.users.push(usr);
        return this.users;
    }

    findAll(): User[] {
        return this.users;
    }

    postAllUsers() {
        this.users.forEach((user) => this.postUser(user));
    }

    postUser(user: User) {
        //

    }
}

function mapFromApi(data: IUserDataFromApi): IUserConfig {
    return {
        body: data.body,
        method: data.method,
        primaryEmail: data.primaryEmail,
        url: data.url,
    };
}
