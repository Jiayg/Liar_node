import { ConfigModule, ConfigService } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CryptoUtil } from '@/common/utils/crypto.util';
import { AuthModule } from '../auth/auth.module';
import * as controllers from './controllers';
import * as services from './services';
import * as entities from './entities';
import * as _ from 'lodash';

const entitieModule = _.values(entities);
const serviceModule = _.values(services);
const controllerModule = _.values(controllers);

@Module({
  imports: [
    TypeOrmModule.forFeature([...entitieModule]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: config.get('JWT_EXPIRESIN')
        }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [...controllerModule],
  providers: [...serviceModule, CryptoUtil],
  exports: [...serviceModule],
})
export class UserModule { }
