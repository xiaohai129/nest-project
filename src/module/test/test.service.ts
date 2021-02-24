import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/libs/crud';
import { Repository } from 'typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestService extends CrudService<Test> {
  constructor(
    @InjectRepository(Test)
    private readonly userRepository: Repository<Test>
  ) {
    super(userRepository);
  }
}
