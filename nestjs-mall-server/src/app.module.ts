import { UserTokenService } from './modules/user/services/user-token.service';
import { AccountModule } from './modules/account/account.module';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GoodModule } from './modules/good/good.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    LoggerModule,
    AccountModule,
    UserModule,
    GoodModule,
    CategoryModule
  ],
  providers: [
    UserTokenService],
})
export class AppModule { }
