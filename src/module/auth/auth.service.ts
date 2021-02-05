import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserTokenDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(data: UserTokenDto) {
    return this.jwtService.signAsync(data, {
      secret: '123'
    });
  }

  verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
