import { LoggerModule } from './modules/logger/logger.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    LoggerModule,
    UserModule,
    // ProductModule,
    // OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
