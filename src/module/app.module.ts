import { ClassifyModule } from './classify/classify.module';
import { CacheModule } from './cache/cache.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../config/index.config';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ...configService.get('db'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true
        };
      }
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get('redis');
      }
    }),
    AuthModule,
    CacheModule,
    UserModule,
    ArticleModule,
    ClassifyModule,
    CacheModule
  ]
})
export class AppModule {}
