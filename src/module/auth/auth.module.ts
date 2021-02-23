import { AuthService } from './auth.service';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheService } from '../cache/cache.service';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwtSecret')
        };
      }
    })
  ],
  providers: [AuthService, ConfigService, CacheService],
  exports: [AuthService]
})
export class AuthModule {}
