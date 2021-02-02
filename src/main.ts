import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorRequestFilter } from './filter/error-request.filter';
import { TransformInterceptor } from './Interceptor/transform.interceptor';
import { AppModule } from './module/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Test example').setDescription('The test API description').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局过滤器
  app.useGlobalFilters(new ErrorRequestFilter());

  await app.listen(3000);
}
bootstrap();
