import { UpdateUserDto } from '../dto/update-user-dto-interface';
import { CreateUserDto } from '../dto/create-user-dto-interface';
import { UsersService } from '../services/users.service';
import { UsersHttpExceptionFilter } from '../exception-filters/users-http-exception.filter';
import { Body, Controller, Post, UseFilters, HttpStatus, HttpException, Patch, Req } from '@nestjs/common';
import { UpdateUsersService } from '../services/update-users.service';
import { Request } from 'express';

import * as fs from 'fs';
import * as path from 'path';

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
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Patch()
    @UseFilters(new UsersHttpExceptionFilter())
    async updateUser(
        @Req() request: Request,
        @Body() updateUsersDto: UpdateUserDto,
    ) {
        return this.updateUsersService.update(updateUsersDto)
            .then(res => handleJsonFile(res, request.headers.filename))
            .catch((err) => {
                const fileName = path.join(__dirname, '../../../../logs/update-user.log');
                fs.appendFile(fileName, JSON.stringify(err.toJSON()) + '\n', (error) => console.log(err));
                throw new HttpException(err, err.code);
            });
    }
}

function handleJsonFile(res, fileName: any) {
    fs.rename(`jobs/${fileName}`, `jobs/done/${fileName}`, (err) => {
        if (err) throw err;
        console.log('File moved to done folder!');
    });

    return res.data;
}
