import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(data: any) {
    this.jwtService.signAsync(data);
    return '11221';
  }
}
