import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import * as _ from 'lodash';
import * as entities from './entities';
import * as services from './services';
import * as controllers from './controllers';

const entitieModule = _.values(entities);
const serviceModule = _.values(services);
const controllerModule = _.values(controllers);

@Module({
    imports: [TypeOrmModule.forFeature([...entitieModule])],
    controllers: [...controllerModule],
    providers: [...serviceModule],
    exports: [...serviceModule],
})
export class RoleModule { }
