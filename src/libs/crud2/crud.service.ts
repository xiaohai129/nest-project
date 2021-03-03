import { Repository } from 'typeorm';

export class CrudService<T> {
  constructor(private readonly entity: Repository<T>) {}

  create(params: T) {
    return this.entity.insert(params);
  }

  async get(id: number) {
    console.log(id);

    return await this.entity.findOne(id);
  }

  async delete(id: number) {
    const res = await this.entity.delete(id);
    return res.raw.id;
  }

  async update(params: T) {
    const pid = params['id'];
    delete params['id'];
    await this.entity.update(pid, params);
    return pid;
  }

  async getList(options: any) {
    const res = await this.entity.findAndCount({
      skip: options.pageNum * options.pageSize,
      take: options.pageSize
    });
    return {
      total: res[1] as number,
      list: res[0] as T[]
    };
  }
}
