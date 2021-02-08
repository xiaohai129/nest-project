import { LoggerService } from '@nestjs/common';

export class Logger implements LoggerService {
  log(message: string) {
    console.log(message);
    /* your implementation */
  }
  error(message: string, trace: string) {
    console.log(message, trace);

    /* your implementation */
  }
  warn(message: string) {
    console.log(message);

    /* your implementation */
  }
  debug(message: string) {
    console.log(message);

    /* your implementation */
  }
  verbose(message: string) {
    console.log(message);

    /* your implementation */
  }
}
