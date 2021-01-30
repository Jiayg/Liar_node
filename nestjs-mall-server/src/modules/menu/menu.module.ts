import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { Module } from '@nestjs/common';
import * as _ from 'lodash';
import * as entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

const entitieModule = _.values(entities);
@Module({
    imports: [        TypeOrmModule.forFeature([...entitieModule])],
    controllers: [MenuController],
    providers: [MenuService],
})
export class MenuModule { }
