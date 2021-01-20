import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ProductModule,
    UserModule,
    OrderModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
