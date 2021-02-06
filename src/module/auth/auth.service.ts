import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(data: UserTokenDto) {
    return this.jwtService.sign(data, {
      secret: '123',
      expiresIn: '24h'
    });
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token, {
      secret: '123'
    });
  }
}
