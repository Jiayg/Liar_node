import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as _ from 'lodash';
import * as entities from './entities';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { UserModule } from '../user/user.module';
const entitieModule = _.values(entities);
@Module({
    imports: [
        TypeOrmModule.forFeature([...entitieModule]),
        UserModule
    ],
    controllers: [RoleController],
    providers: [RoleService],
    exports: [RoleService]
})
export class RoleModule { }
