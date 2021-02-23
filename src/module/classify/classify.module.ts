import { ClassifyController } from './classify.controller';
import { ClassifyService } from './classify.service';
import { Module } from '@nestjs/common';
import { Classify } from './classify.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Classify])],
  controllers: [ClassifyController],
  providers: [ClassifyService]
})
export class ClassifyModule {}
