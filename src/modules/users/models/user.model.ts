import { IUserConfig } from '../interfaces/user-config.interface';

export class User {
    body: string;
    method: string;
    primaryEmail: string;
    url: string;

    constructor(data: IUserConfig) {
        this.body = data.body;
        this.method = data.method;
        this.primaryEmail = data.primaryEmail;
        this.url = data.url;
    }
}
