import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    length: 10
  })
  id: string;

  @ApiProperty({
    description: '用户名称'
  })
  @IsNotEmpty()
  @Column({
    length: 16
  })
  name: string;

  @ApiProperty({
    description: '密码'
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(18)
  @Column({
    length: 18
  })
  passwrod: string;

  @ApiProperty({
    description: '手机号'
  })
  @IsMobilePhone('zh-CN')
  @Column({
    length: 11,
    unique: true
  })
  mobile: string;
}
