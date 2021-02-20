import { Controller, Get, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('日志')
export class LoggerController {
  @Get('logger')
  getLoggerInfo(@Headers() headers: any) {
    return `http://${headers.host}/log/http.txt`;
  }
}
