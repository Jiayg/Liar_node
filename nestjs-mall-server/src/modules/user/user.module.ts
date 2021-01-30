
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as _ from 'lodash';
import * as entities from './entities';
import * as services from './services';
import * as controllers from './controllers';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  providers: [...serviceModule],
  exports: [...serviceModule],
})
export class UserModule { }
