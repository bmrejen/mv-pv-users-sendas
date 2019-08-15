import { UsersService } from '../services/users.service';
import { UsersHttpExceptionFilter } from '../exception-filters/users-http-exception.filter';
import { CreateUserDto } from '../dto/create-user.dto';
import { Body, Controller, Get, Post, Req, UseFilters, HttpStatus, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../models/user.model';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
        //
    }

    @Get()
    findAll(@Req() request: Request): User[] {
        return this.usersService.findAll();
    }

    @Post()
    @UseFilters(new UsersHttpExceptionFilter())
    async create(@Body() createUserDto: CreateUserDto): Promise<User[]> {
        if (Object.keys(createUserDto).length === 0) {
            throw new HttpException('Object cannot be empty', HttpStatus.LENGTH_REQUIRED);
        }
        if (isAnyPropertyEmpty(createUserDto)) {
            throw new HttpException('No property can be empty', HttpStatus.LENGTH_REQUIRED);
        } else {
            return this.usersService.create(createUserDto);
        }
    }
}

function isAnyPropertyEmpty(obj) {
    return Object.values(obj)
        .some((value) => value == null || value === '');
}

