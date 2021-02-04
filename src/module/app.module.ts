import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '121.4.217.218',
      port: 3306,
      username: 'nestjs-test',
      password: 'hui5201314',
      database: 'nestjs-test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
