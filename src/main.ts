import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ErrorRequestFilter from './filter/error-request.filter';
import TransformInterceptor from './Interceptor/transform.interceptor';
import { AppModule } from './module/app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        excludeExtraneousValues: true
      },
      enableDebugMessages: true,
      stopAtFirstError: true,
      exceptionFactory(errors) {
        const error = errors[0];
        const constraints = error.constraints;
        for (const key in constraints) {
          return new HttpException(constraints[key], 400);
        }
        return new HttpException('参数验证失败', 400);
      }
    })
  );

  // 拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 过滤器
  app.useGlobalFilters(new ErrorRequestFilter());

  app.useStaticAssets(join(__dirname, '../public/', 'script'), {
    prefix: '/js/'
  });
  app.useStaticAssets(join(__dirname, '../public/', 'log'), {
    prefix: '/log/'
  });

  const config = new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addServer('/api')
    .addSecurity('auth', {
      type: 'apiKey',
      name: 'token',
      description: '用户token',
      in: 'header'
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document, {
    customJs: '/js/set-token.js'
  });

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
