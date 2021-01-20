
import { Module } from '@nestjs/common';
import { MyLogger } from './services';

@Module({
    providers: [MyLogger],
    exports: [MyLogger]
})
export class LoggerModule { }
