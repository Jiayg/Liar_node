import { DynamicModule, HttpModule, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_PASSPORT_STRATEGIES } from './passport';
import { authenticate } from 'passport';
import * as _ from 'lodash';
import * as entities from './entities';
import * as services from './services';
import * as controllers from './controllers';

const entitieModule = _.values(entities);
const serviceModule = _.values(services);
const controllerModule = _.values(controllers);

@Module({
  imports: [TypeOrmModule.forFeature([...entitieModule])],
  controllers: [...controllerModule],
  providers: [...serviceModule, ...USER_PASSPORT_STRATEGIES],
  exports: [...serviceModule],
})
export class UserModule implements NestModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: UserModule,
      imports: [
        HttpModule,
        TypeOrmModule.forFeature([...entitieModule]),
      ],
      controllers: [...controllerModule],
      providers: [
        ...options.providers,
        ...serviceModule,
        ...USER_PASSPORT_STRATEGIES,
      ],
      exports: [...serviceModule],
    };
  }
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        authenticate('admin_sign', { session: false, passReqToCallback: true })
      )
      .forRoutes('admin_sign/signin');
  }
}
