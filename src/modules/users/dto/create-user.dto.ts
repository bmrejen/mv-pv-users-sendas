import { IUserDataFromApi } from '../interfaces/user-data-from-api.interface';

export class CreateUserDto implements IUserDataFromApi {
    readonly body: string;
    readonly method: string;
    readonly primaryEmail: string;
    readonly url: string;
}
