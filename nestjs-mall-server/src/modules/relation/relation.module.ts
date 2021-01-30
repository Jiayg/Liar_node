import { RelationController } from './relation.controller';
import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import * as _ from 'lodash';
import * as entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';


const entitieModule = _.values(entities);

@Module({
    imports: [
        TypeOrmModule.forFeature([...entitieModule])
    ],
    controllers: [RelationController],
    providers: [RelationService],
})
export class RelationModule { }
