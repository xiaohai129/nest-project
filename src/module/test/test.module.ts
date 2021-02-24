import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Module } from '@nestjs/common';
import { Test } from './test.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
