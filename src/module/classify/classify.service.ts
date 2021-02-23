import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../base/base.service';
import { Classify } from './classify.entity';

@Injectable()
export class ClassifyService extends BaseService<Classify> {
  constructor(
    @InjectRepository(Classify)
    private readonly userRepository: Repository<Classify>
  ) {
    super(userRepository);
  }
}
