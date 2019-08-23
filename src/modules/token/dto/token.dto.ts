export class TokenDto {
    readonly primaryEmail: string;

    constructor(private readonly email: string) {
        this.primaryEmail = email;
    }
}
