import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';

export interface ApiResponse<T = any> {
  data: T;
  code: number;
  msg: string;
}

export default class TransformInterceptor<T = any> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data: classToPlain(data),
          code: 200,
          msg: '成功'
        };
      })
    ) as any;
  }
}
