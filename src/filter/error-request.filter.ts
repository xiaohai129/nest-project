import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { LoggerService } from 'src/module/logger/logger.service';

export default class ErrorRequestFilter implements ExceptionFilter {
  private loggerService: LoggerService;
  constructor() {
    this.loggerService = new LoggerService();
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const info = {
      msg: exception.message,
      code: exception.status || exception.sqlState,
      data: null
    };
    res.status(HttpStatus.OK).json(info);

    this.loggerService.writeLog(res.req, 'error', info);
  }
}
