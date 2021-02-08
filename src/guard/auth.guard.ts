import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/module/auth/auth.service';
import { LoggerService } from 'src/module/logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService, private readonly loggerService: LoggerService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const token = (request.headers as any).token;
    let user;
    try {
      user = this.authService.verifyToken(token);
    } catch (err) {
      throw new HttpException('token已失效', HttpStatus.UNAUTHORIZED);
    }
    if (user) {
      const methodRoles = this.reflector.get('roles', context.getHandler());
      const userRoles = user.roles;
      if (methodRoles && userRoles) {
        if (methodRoles.filter((v) => userRoles.includes(v)).length != methodRoles.length) {
          throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
        }
      }
    }
    this.loggerService.writeLog(request, 'info');
    return true;
  }
}
