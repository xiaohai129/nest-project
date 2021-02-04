import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

export default class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    ctx.getResponse().status(200);
    return next.handle().pipe(
      map((data) => {
        return {
          data: classToPlain(data),
          code: 200,
          msg: '成功'
        };
      })
    );
  }
}
