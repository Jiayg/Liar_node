import { RoleModule } from './modules/role/role.module';
import { RelationService } from './modules/user/services/relation.service';
import { MenuService } from './modules/user/services/menu.service';
import { RoleService } from './modules/role/services/role.service';
import { HttpExceptionFilter } from './common/filters/http-exception-filter';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { Module, ValidationPipe, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GoodModule } from './modules/good/good.module';
import { CategoryModule } from './modules/category/category.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    UserModule,
    RoleModule,
    GoodModule,
    AccountModule,
    CategoryModule,
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
