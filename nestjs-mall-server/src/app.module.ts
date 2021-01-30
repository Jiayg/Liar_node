import { Product_TypeModule } from './modules/product_type/product_type.module';
import { ProductModule } from './modules/product/product.module';
import { RelationModule } from './modules/relation/relation.module';
import { MenuModule } from './modules/menu/menu.module';
import { RoleModule } from './modules/role/role.module';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { Module, ValidationPipe, NestModule, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    RoleModule,
    RelationModule,
    MenuModule,
    ProductModule,
    Product_TypeModule,
    AccountModule
  ],
  providers: [
    ...[{ provide: APP_PIPE, useClass: ValidationPipe }],
    HttpExceptionFilter
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('*');
  }
}
