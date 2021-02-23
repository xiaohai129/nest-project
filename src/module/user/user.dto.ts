import { OmitType, PickType } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';
import { ApiField, RoleType } from 'src/decorator/api.decorator';
import { Compare } from 'src/decorator/validator.decorator';
import { User } from './user.entity';

export class UserTokenDto extends PickType(User, ['id', 'mobile', 'nickname']) {
  roles: RoleType[] = ['add', 'get'];
}

export class UserLoginParamsDto extends PickType(User, ['mobile', 'passwrod']) {}

export class UserLoginResultDto extends User {
  @ApiField({
    description: '添加的用户id'
  })
  token: string;
}

export class UserRegisterParamsDto extends OmitType(User, ['id', 'createDate', 'updateDate']) {}

export class UserUpdateParamsDto extends OmitType(UserRegisterParamsDto, ['passwrod', 'mobile']) {}

export class UserUpdatePasswordParamsDto extends UserLoginParamsDto {
  @ApiField({
    description: '确认密码'
  })
  @Compare('passwrod', {
    message: '两次密码不相等'
  })
  confirmPassword: string;

  @ApiField({
    description: '验证码'
  })
  @IsNumberString({
    no_symbols: true
  })
  @Length(6, 6)
  code: string;
}

export class UserUpdateAvatarParamsDto extends PickType(User, ['avatar']) {}
