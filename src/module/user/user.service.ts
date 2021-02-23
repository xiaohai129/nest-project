import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../base/base.service';
import { UserLoginParamsDto, UserRegisterParamsDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async addUser(data: UserRegisterParamsDto) {
    try {
      return await this.add(data);
    } catch (err) {
      const error = err.error;
      if (error.sqlState === '23000') {
        throw '手机号已存在';
      }
      throw err;
    }
  }

  async findUser(params: UserLoginParamsDto) {
    const res = await this.find({
      where: params
    });

    if (res) {
      return res;
    } else {
      throw new HttpException('账号密码错误', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
