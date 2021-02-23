import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { MD5 } from 'crypto-js';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Api } from 'src/decorator/api.decorator';
import { UserInfo } from 'src/decorator/user-info.decorator';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '../cache/cache.service';
import { UserService } from './user.service';
import {
  UserLoginResultDto,
  UserLoginParamsDto,
  UserRegisterParamsDto,
  UserUpdateParamsDto,
  UserTokenDto,
  UserUpdatePasswordParamsDto,
  UserUpdateAvatarParamsDto
} from './user.dto';

@Controller('/user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly cacheService: CacheService) {}

  @Api({
    route: '/login',
    method: 'POST',
    title: '登录',
    auth: false,
    result: UserLoginResultDto
  })
  async login(@Body() params: UserLoginParamsDto) {
    params.passwrod = MD5(params.passwrod).toString();
    const res1 = await this.userService.findUser(params);
    const res2 = await this.authService.getToken({ id: res1.id, mobile: res1.mobile, nickname: res1.nickname, roles: ['add', 'get'] });

    if (process.env.NODE_ENV === 'development') {
      const jsPath = join(__dirname, '../../../', '/public/script/set-token.js');
      let jsstr = readFileSync(jsPath).toString();
      jsstr = jsstr.replace(/token = '(.*)'/gi, `token = '${res2}'`);
      writeFileSync(jsPath, jsstr);
    }

    return plainToClass(UserLoginResultDto, {
      ...res1,
      token: res2
    });
  }

  @Api({
    route: '/register',
    method: 'POST',
    title: '注册',
    auth: false,
    description: '用户ID'
  })
  async register(@Body() params: UserRegisterParamsDto) {
    params.passwrod = MD5(params.passwrod).toString();
    return await this.userService.addUser(params);
  }

  @Api({
    route: '/update',
    method: 'POST',
    title: '修改当前用户信息'
  })
  async update(@Body() params: UserUpdateParamsDto, @UserInfo() user: UserTokenDto) {
    return await this.userService.updateById(user.id, params);
  }

  @Api({
    route: '/details',
    method: 'GET',
    title: '获取当前用户信息'
  })
  async getInfo(@UserInfo() user: UserTokenDto) {
    return await this.userService.findById(user.id);
  }

  @Api({
    route: '/updateAvatar',
    method: 'POST',
    title: '更新当前用户头像'
  })
  async updateAvatar(@UserInfo() user: UserTokenDto, @Body() params: UserUpdateAvatarParamsDto) {
    return await this.userService.updateById(user.id, params);
  }

  @Api({
    route: '/updatePassword',
    method: 'POST',
    title: '更改当前用户密码'
  })
  async updatePassword(@UserInfo() user: UserTokenDto, @Body() params: UserUpdatePasswordParamsDto) {
    params.passwrod = MD5(params.passwrod).toString();
    await this.userService.updateById(user.id, { passwrod: params.passwrod });
    await this.cacheService.del(user.id);
  }

  @Api({
    method: 'POST',
    route: '/test',
    title: '测试',
    roles: ['add']
  })
  async test(@UserInfo() user: UserTokenDto) {
    let jsstr = readFileSync(join(__dirname, '../../../', '/public/script/set-token.js')).toString();
    jsstr = jsstr.replace(/token = '(.*)'/gi, `token = '${123}'`);
    console.log(jsstr);
  }
}
