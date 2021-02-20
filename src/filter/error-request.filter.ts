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
    let message: any = exception;

    if (typeof message === 'object') {
      message = exception.message;
      if (exception.error) {
        message = exception.error.sqlMessage;
      }
    }
    const info = {
      msg: message,
      code: exception.status || exception.sqlState || HttpStatus.INTERNAL_SERVER_ERROR,
      data: null
    } as any;

    if (exception.status !== 404 && exception.status !== 401) {
      const logInfo = { ...info } as any;
      if (exception.error && exception.error.sql) {
        logInfo.sql = exception.error && exception.error.sql;
      }
      this.loggerService.writeLog(res.req, 'error', logInfo);
    }
    res.status(HttpStatus.OK).json(info);
  }
}
