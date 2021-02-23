import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '../cache/cache.service';
import { UserTokenDto } from '../user/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly cacheService: CacheService) {}

  getToken(data: UserTokenDto) {
    const token = this.jwtService.sign(data, {
      secret: this.configService.get('jwt.secret')
    });
    this.cacheService.set(data.id, token);
    return token;
  }

  verifyToken(token: string) {
    return this.jwtService.verify<UserTokenDto>(token, {
      secret: this.configService.get('jwt.secret')
    });
  }
}
