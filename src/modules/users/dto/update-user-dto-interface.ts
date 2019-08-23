import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty() body: IUpdateUserDtoBody;
    @IsNotEmpty() method: string;
    @IsNotEmpty() primaryEmail: string;
    @IsNotEmpty() url: string;
}

interface IUpdateUserDtoBody extends Readonly<{
    signature: string;
    displayName: string;
    isDefault: boolean;
    sendAsEmail: string;
    treatAsAlias: boolean;
    replyToAddress: string;
}> { }
