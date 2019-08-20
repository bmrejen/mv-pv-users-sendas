export interface IUpdateUserDto extends Readonly<{
    body: IUpdateUserDtoBody;
    method: string;
    primaryEmail: string;
    url: string;
}> { }

interface IUpdateUserDtoBody extends Readonly<{
    signature: string;
    displayName: string;
    isDefault: boolean;
    sendAsEmail: string;
    treatAsAlias: boolean;
    replyToAddress: string;
}> { }
