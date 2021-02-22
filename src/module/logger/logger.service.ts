import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { appendFile } from 'fs';
import * as moment from 'moment';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class LoggerService {
  writeLog(data: any, type: string, error?: any) {
    let str = '';
    if (type === 'info' || type === 'error') {
      str += `${moment().format('YYYY-MM-DD hh:mm:ss')}    ${data.method} ${data.url}\n`;
      if (isNotEmptyObject(data.params)) {
        str += `params: ${JSON.stringify(data.params)}\n`;
      }
      if (isNotEmptyObject(data.query)) {
        str += `query: ${JSON.stringify(data.query)}\n`;
      }
      if (isNotEmptyObject(data.body)) {
        str += `body: ${JSON.stringify(data.body)}\n`;
      }
      if (error) {
        str += `error: ${JSON.stringify(error)}\n`;
      }
    }
    str += `------------------------------------${type}------------------------------------\n\n`;
    appendFile(join(__dirname, '../../../', '/public/log/http.log'), str, (err) => {
      if (err) {
        console.log(err.message);
      }
    });
  }
}
