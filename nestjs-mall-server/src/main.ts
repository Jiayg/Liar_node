import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Log4jsService } from "@quickts/nestjs-log4js";
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { TransformInterceptor } from './common/interceptor';
import { HttpExceptionFilter } from './common/filters';
import { AppModule } from './app.module';
import * as helmet from 'helmet';


async function bootstrap() {
  // 引用log4js替换官方log
  const logger = new Log4jsService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger });

  //自动验证
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,//禁用详细错误
    transform: true,//负载对象转换(Transform)
  }));

  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 跨源资源共享
  app.enableCors();

  // Web应用安全中间件
  app.use(helmet());

  // IP请求限速
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 60, // limit each IP to 100 requests per windowMs
    }),
  );

  // 配置Swagger
  const options = new DocumentBuilder()
    .setExternalDoc('mall前端文档', '实列')
    .setTitle('small mall example')
    .setDescription('The mall API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document,
    {
      customSiteTitle: '简单商城项目文档',
      swaggerOptions: {
        explorer: true,
        docExpansion: 'list',
        filter: false,
        showRequestDuration: true,
        syntaxHighlight: {
          active: true,
          theme: "tomorrow-night"
        }
      }
    }
  );

  // 启动监听端口
  await app.listen(3000);

  console.log('http://localhost:3000');
}
bootstrap();
