import { Product_TypeController } from './product_type.controller';
import { Product_TypeService } from './product_type.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        Product_TypeController, ],
    providers: [
        Product_TypeService, ],
})
export class Product_TypeModule {}
