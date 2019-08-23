import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(HttpException)
export class UsersHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse<Response>();
        const request = host.switchToHttp().getRequest<Request>();
        const status = exception.getStatus();

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: exception.message,
            method: request.method,
            name: exception.name,
        };

        // Logger.log('ERROR --', JSON.stringify(errorResponse));

        response
            .status(status)
            .json(errorResponse);
    }
}
