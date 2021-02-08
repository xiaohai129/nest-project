import { Controller, Get } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class LoggerController {
  @Get('logger')
  getLoggerInfo() {
    const log = readFileSync(join(__dirname, '../../../', '/public/log/http.txt'));
    return log;
  }
}
