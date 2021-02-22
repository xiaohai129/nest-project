import { IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiColumn } from 'src/decorator/api.decorator';
import { Entity } from 'typeorm';

@Entity()
export class User {
  @ApiColumn({
    description: '用户ID',
    column: {
      primary: true,
      length: 10
    }
  })
  @IsNotEmpty()
  id: string;

  @ApiColumn({
    description: '用户名称',
    column: {
      length: 16
    }
  })
  @IsNotEmpty()
  nickname: string;

  @ApiColumn({
    description: '密码',
    column: {
      length: 32
    },
    exclude: true
  })
  @MinLength(6)
  @MaxLength(18)
  @IsNotEmpty()
  passwrod: string;

  @ApiColumn({
    description: '手机号',
    column: {
      length: 11,
      unique: true,
      update: false
    }
  })
  @IsMobilePhone('zh-CN')
  mobile: string;

  @ApiColumn({
    description: '用户头像地址'
  })
  avatar: string;

  @ApiColumn({
    description: '个性签名',
    column: {
      length: 128
    }
  })
  slogan: string;

  @ApiColumn({
    description: '用户标签',
    column: {
      length: 64,
      type: 'varchar',
      transformer: {
        to(value) {
          return value.join(',');
        },
        from(value) {
          return value.split(',');
        }
      }
    }
  })
  tags: string[];

  @ApiColumn({
    description: '创建时间',
    date: 'CreateDateColumn'
  })
  createDate: Date;

  @ApiColumn({
    description: '更新时间',
    date: 'UpdateDateColumn'
  })
  updateDate: Date;
}
