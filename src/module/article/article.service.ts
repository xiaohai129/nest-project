import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../base/base.service';
import { Article } from './article.entity';

@Injectable()
export class ArticleService extends BaseService<Article> {
  constructor(
    @InjectRepository(Article)
    private readonly userRepository: Repository<Article>
  ) {
    super(userRepository);
  }

  async add(data: any) {
    try {
      return await super.add(data);
    } catch (err) {
      const error = err.error;
      if (error.sqlState === '23000' && error.sqlMessage.includes('classifysId')) {
        throw '分类ID无效';
      }
      throw err;
    }
  }
}
