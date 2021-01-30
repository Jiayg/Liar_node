import { PermService } from './perm.service';
import { PermController } from './perm.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [PermController],
    providers: [PermService],
})
export class PermModule { }
