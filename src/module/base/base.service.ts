import { HttpException, HttpStatus } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { uid } from 'uid';

export default class BaseService<T = any> {
  constructor(private readonly baseRepository: Repository<T>) {}

  async add(data: T) {
    try {
      const uuid = uid(10);
      (data as any).id = uuid;
      await this.baseRepository.insert(data);
      return uuid;
    } catch (error) {
      throw { message: '添加数据失败', error };
    }
  }

  async find(options?: FindOneOptions<T>) {
    try {
      const res = await this.baseRepository.findOne(options);
      return classToClass(res);
    } catch {
      throw new HttpException('查找数据失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findList(options: FindManyOptions<T> = { skip: 0, take: 10 }) {
    try {
      const res = await this.baseRepository.findAndCount(options);
      return {
        list: classToClass(res[0]),
        total: res[1]
      };
    } catch {
      throw new HttpException('查找数据失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string) {
    try {
      const res = this.baseRepository.findByIds([id]);
      return classToClass(res[0]);
    } catch {
      throw new HttpException('查找数据失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
