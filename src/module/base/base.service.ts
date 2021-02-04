import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { uid } from 'uid';

export default class BaseService<T = any> {
  constructor(private readonly baseRepository: Repository<T>) {}

  async add(data: T) {
    const uuid = uid(10);
    (data as any).id = uuid;
    const res = await this.baseRepository.insert(data);
    if (res) {
      return uuid;
    }
    throw new HttpException('添加数据错误', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
