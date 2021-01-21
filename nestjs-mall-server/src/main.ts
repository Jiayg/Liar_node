import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { MyLogger } from './modules/logger/services';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //自动验证
  app.useGlobalPipes(new ValidationPipe());

  // log
  app.useLogger(app.get(MyLogger));

  // 配置Swagger
  const options = new DocumentBuilder()
    .setTitle('mall example')
    .setDescription('The mall API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  // 跨源资源共享
  app.enableCors();

  // Web应用安全中间件
  app.use(helmet());

  // 跨站点请求伪造
  // app.use(csurf());

  // IP请求限速
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      max: 60, // limit each IP to 100 requests per windowMs
    }),
  );

  // 启动监听端口
  await app.listen(3000);

  console.log('http://localhost:3000');
}
bootstrap();
