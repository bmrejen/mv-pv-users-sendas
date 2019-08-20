import { IUpdateUserDto } from '../dto/update-user-dto-interface';
import { ICreateuserDto } from '../dto/create-user-dto-interface';
import { UsersService } from '../services/users.service';
import { UsersHttpExceptionFilter } from '../exception-filters/users-http-exception.filter';
import { Body, Controller, Post, UseFilters, HttpStatus, HttpException, Patch, Logger } from '@nestjs/common';
import { UpdateUsersService } from '../services/update-users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private updateUsersService: UpdateUsersService,
    ) {
        //
    }

    @Post()
    @UseFilters(new UsersHttpExceptionFilter())
    async create(@Body() createUserDto: ICreateuserDto) {
        if (!isDtoValid(createUserDto)) {
            throw new HttpException('No property can be empty', HttpStatus.LENGTH_REQUIRED);
        } else {
            return this.usersService.create(createUserDto);
        }
    }

    @Patch()
    @UseFilters(new UsersHttpExceptionFilter())
    async updateUser(@Body() updateUsersDto: IUpdateUserDto) {

        if (!isDtoValid(updateUsersDto)) {
            throw new HttpException('No property can be empty', HttpStatus.LENGTH_REQUIRED);
        } else {
            return this.updateUsersService.update(updateUsersDto)
                .then((res) => res);
        }
    }
}

function isDtoValid(dto): boolean {
    return !(Object.keys(dto).length === 0 || isAnyPropertyEmpty(dto));
}

function isAnyPropertyEmpty(obj) {
    return Object.values(obj)
        .some((value) => value == null || value === '');
}
