import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BaseService from '../base/base.service';
import { UserLoginParamDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository);
  }

  async addUser(data: User) {
    try {
      return await this.add(data);
    } catch (err) {
      if (err.sqlState === '23000') {
        throw new HttpException('手机号已存在', HttpStatus.GONE);
      }
    }
  }

  async findUser(params: UserLoginParamDto) {
    const res = await this.userRepository.find({
      where: params
    });
    if (res.length <= 0) {
      throw new HttpException('用户不存在', HttpStatus.GONE);
    }
    return res[0];
  }
}
