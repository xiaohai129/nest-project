import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { LoggerModule } from '../logger/logger.module';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, LoggerModule],
  controllers: [UserController],
  providers: [UserService, CacheService]
})
export class UserModule {}
