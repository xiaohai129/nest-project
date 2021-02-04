import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import ErrorRequestFilter from './filter/error-request.filter';
import TransformInterceptor from './Interceptor/transform.interceptor';
import { AppModule } from './module/app.module';
import { HttpException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      },
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

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局过滤器
  app.useGlobalFilters(new ErrorRequestFilter());

  const config = new DocumentBuilder().setTitle('Test example').setDescription('The test API description').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
