import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { RoleType } from 'src/decorator/api.decorator';
import { User } from '../user.entity';

export class UserTokenDto extends PickType(User, ['id', 'mobile', 'nickname']) {
  roles: RoleType[] = ['add', 'get'];
}

export class UserLoginParamDto extends PickType(User, ['mobile', 'passwrod']) {}

export class UserLoginResultDto extends User {
  @ApiProperty({
    description: '添加的用户id'
  })
  token: string;
}

export class UserRegisterParamsDto extends OmitType(User, ['id', 'createDate', 'updateDate']) {}

export class UserUpdateParamsDto extends OmitType(UserRegisterParamsDto, ['passwrod', 'mobile']) {}
