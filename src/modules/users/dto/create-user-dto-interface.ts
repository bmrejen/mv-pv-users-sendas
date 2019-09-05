import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty() body: string;
    @IsNotEmpty() method: string;
    @IsNotEmpty() primaryEmail: string;
    @IsNotEmpty() url: string;
}
