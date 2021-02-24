import { classToClass } from 'class-transformer';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { uid } from 'uid';

export default class BaseService<T = any> {
  constructor(private readonly baseRepository: Repository<T>) {}

  async add(data: T | any) {
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
    } catch (error) {
      throw { message: '查找数据失败', error };
    }
  }

  async findList(options: FindManyOptions<T> = { skip: 0, take: 10 }) {
    try {
      const res = await this.baseRepository.findAndCount(options);
      return {
        list: classToClass(res[0]),
        total: res[1]
      };
    } catch (error) {
      throw { message: '查找数据失败', error };
    }
  }

  async findById(id: string, options: FindManyOptions<T> = {}) {
    try {
      const res = await this.baseRepository.findByIds([id], options);
      return classToClass(res[0]);
    } catch (error) {
      throw { message: '查找数据失败', error };
    }
  }

  async updateById(id: string, info: any) {
    try {
      const res = await this.baseRepository.update({ id } as any, info);
      const affected = res.affected;
      if (affected <= 0) {
        throw new Error();
      }
    } catch (error) {
      throw { message: '更新数据失败', error };
    }
  }

  async delete(id: string) {
    try {
      return await this.baseRepository.delete({ id } as any);
    } catch (error) {
      throw { message: '删除数据失败', error };
    }
  }
}
