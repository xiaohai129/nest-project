import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { classToClass, plainToClass } from 'class-transformer';
import { MD5 } from 'crypto-js';
import { Api } from 'src/decorator/api.decorator';
import { AuthService } from '../auth/auth.service';
import { UserLoginResultDto, UserLoginParamDto, UserRegisterParamsDto, UserUpdateParamsDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Api({
    route: '/login',
    method: 'POST',
    title: '登录',
    auth: false,
    result: UserLoginResultDto
  })
  async login(@Body() params: UserLoginParamDto) {
    params.passwrod = MD5(params.passwrod).toString();
    const res1 = await this.userService.findUser(params);
    const res2 = await this.authService.getToken({ ...res1, roles: ['add', 'get'] });

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
  async updateInfo(@Body() params: UserUpdateParamsDto) {
    console.log(params);

    return await this.userService.updateById('751fa83803', params);
  }

  @Api({
    method: 'POST',
    route: '/test',
    title: '测试',
    roles: ['add']
  })
  async test(@Body() params: User) {
    console.log(params);
  }
}
