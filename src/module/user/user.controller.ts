import { Body, Controller, Get, Post, Query, Response } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { Api } from 'src/decorator/api.decorator';
import { AuthService } from '../auth/auth.service';
import { UserInfoResultDto, UserLoginParamDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: '用户登录',
    tags: ['用户']
  })
  @ApiOkResponse({
    type: UserInfoResultDto
  })
  async login(@Body() params: UserLoginParamDto) {
    const res1 = await this.userService.findUser(params);
    const res2 = await this.authService.getToken({ ...res1, roles: ['add', 'get'] });
    return {
      ...res1,
      token: res2
    };
  }

  @Post('/register')
  @ApiOperation({
    summary: '用户注册',
    tags: ['用户']
  })
  @ApiOkResponse({
    description: '用户id'
  })
  async add(@Body() params: User) {
    return await this.userService.addUser(params);
  }

  @Api({
    route: '/test',
    title: '测试',
    roles: ['add']
  })
  test() {
    return '123';
  }
}
