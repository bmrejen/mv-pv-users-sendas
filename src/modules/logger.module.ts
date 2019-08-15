import { Module } from '@nestjs/common';
import { MyLogger } from '../services/logger.service';

// We create a module so that MyLogger is a part of the real application and can use dependency injection

@Module({
    providers: [MyLogger],
    exports: [MyLogger],
})
export class LoggerModule { }
