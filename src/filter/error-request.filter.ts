import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';

export class ErrorRequestFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getResponse();

    req.status(HttpStatus.OK).json({
      msg: exception.message,
      code: exception.status,
      data: null
    });
  }
}
