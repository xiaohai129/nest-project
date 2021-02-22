import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/module/auth/auth.service';
import { CacheService } from 'src/module/cache/cache.service';
import { LoggerService } from 'src/module/logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
    private readonly cacheService: CacheService
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const token = (request.headers as any).token;
    let user: any;
    try {
      user = this.authService.verifyToken(token);
    } catch (err) {
      throw new HttpException('token已失效', HttpStatus.UNAUTHORIZED);
    }

    if ((await this.cacheService.get(user.id)) !== token) {
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
      (request as any).user = user;
    }
    this.loggerService.writeLog(request, 'info');
    return true;
  }
}
