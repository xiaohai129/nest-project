import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, MaxLength } from 'class-validator';
import { RoleType } from 'src/decorator/api.decorator';
import { User } from '../user.entity';

export class UserLoginParamDto extends PickType(User, ['mobile', 'passwrod']) {}

export class UserAddParamDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MaxLength(16)
  password: string;

  @IsMobilePhone('zh-CN')
  mobile: string;
}

export class UserInfoResultDto extends User {
  @ApiProperty({
    description: '用户id'
  })
  id: string;
  @ApiProperty({
    description: '添加的用户id'
  })
  token: string;
}

export class UserTokenDto extends PickType(User, ['id', 'mobile', 'nickname']) {
  roles: RoleType[] = ['add', 'get'];
}
