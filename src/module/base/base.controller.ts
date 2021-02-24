import { Body, Controller, Type } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Api } from 'src/decorator/api.decorator';
import BaseService from './base.service';
import { OmitType } from '@nestjs/swagger';

@Controller()
export class BaseController<T> {
  constructor(private readonly baseService: BaseService) {}

  @Api({
    route: 'add',
    method: 'POST',
    title: '添加'
  })
  add(@Body() params: T) {
    this.baseService.add(params);
  }

  @Api({
    route: 'getList',
    method: 'POST',
    title: '列表数据'
  })
  async getList() {
    return await this.baseService.findList();
  }
}
