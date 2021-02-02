import { ApiProperty } from '@nestjs/swagger';

export class UserLoginParamsDto {
  @ApiProperty({
    description: '手机号'
  })
  mobile: string;

  @ApiProperty({
    description: '密码'
  })
  password: string;
}
