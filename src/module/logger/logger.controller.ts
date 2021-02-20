import { Controller, Get, Headers, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { networkInterfaces } from 'os';

@Controller()
@ApiTags('日志')
export class LoggerController {
  @Get('logger')
  getLoggerInfo(@Headers() headers: any, @Request() req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    console.log(ip);

    return `http://${headers.host}/log/http.log`;
  }
}
