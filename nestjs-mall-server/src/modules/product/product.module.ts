import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Module } from '@nestjs/common';
import * as _ from 'lodash';
import * as entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';


const entitieModule = _.values(entities);

@Module({
    imports: [TypeOrmModule.forFeature([...entitieModule])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }
