import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from 'src/module/auth/auth.service';
import { UserTokenDto } from 'src/module/user/dto/user.dto';

@Injectable()
export class XAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: UserTokenDto, info: any, context: ExecutionContext, status: any) {
    const methodRoles = this.reflector.get('roles', context.getHandler());
    const userRoles = user.roles;

    if (methodRoles && userRoles) {
      const flag = Array.from(new Set([...methodRoles, ...userRoles])).length === methodRoles.concat(userRoles).length;
      if (flag) {
        throw new HttpException('没有权限', HttpStatus.UNAUTHORIZED);
      }
    }

    return user as any;
  }
}
