import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { AuthService } from 'src/module/auth/auth.service';
import { UserTokenDto } from 'src/module/user/dto/user.dto';

@Injectable()
export class XAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const token = (request.headers as any).token;
    try {
      const user = this.authService.verifyToken(token);

      const methodRoles = this.reflector.get('roles', context.getHandler());
      const userRoles = user.roles;

      if (methodRoles && userRoles) {
        if (methodRoles.filter((v) => userRoles.includes(v)).length != userRoles.length) {
          throw new HttpException('没有权限', HttpStatus.UNAUTHORIZED);
        }
      }
    } catch (error) {
      console.log(error);

      throw new HttpException('token已失效', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }

  // handleRequest(err: any, user: UserTokenDto, info: any, context: ExecutionContext, status: any) {
  //   const methodRoles = this.reflector.get('roles', context.getHandler());
  //   const userRoles = user.roles;

  //   if (methodRoles && userRoles) {
  //     const flag = Array.from(new Set([...methodRoles, ...userRoles])).length === methodRoles.concat(userRoles).length;
  //     if (flag) {
  //       throw new HttpException('没有权限', HttpStatus.UNAUTHORIZED);
  //     }
  //   }

  //   return user as any;
  // }
}
