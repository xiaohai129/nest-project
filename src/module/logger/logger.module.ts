import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [LoggerController],
  providers: [LoggerService],
  exports: [LoggerService]
})
export class LoggerModule {}
