import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'src/libs/crud';
import { CrudControllerFactory } from 'src/libs/crud/crud.controller';
import { Test } from './test.entity';
import { TestService } from './test.service';

@Controller('/test')
@Crud()
@ApiTags('测试')
export class TestController extends CrudControllerFactory(Test) {
  constructor(service: TestService) {
    super(service);
  }
}
