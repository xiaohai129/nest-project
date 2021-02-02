import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserLoginParamsDto } from './dto/user.dto';

@Controller()
@ApiTags('用户')
export class UserController {
  @Post('/user/login')
  @ApiOperation({
    summary: '用户登录'
  })
  @ApiOkResponse({
    type: UserLoginParamsDto
  })
  async login(@Body() params: UserLoginParamsDto) {
    return params;
  }
}
