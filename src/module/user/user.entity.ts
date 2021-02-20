import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, TransformationType } from 'class-transformer';
import { IsMobilePhone, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

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
  nickname: string;

  @Exclude({
    toPlainOnly: true
  })
  @ApiProperty({
    description: '密码'
  })
  @MinLength(6)
  @MaxLength(18)
  @IsNotEmpty()
  @Column({
    length: 18
  })
  passwrod: string;

  @ApiProperty({
    description: '手机号',
    default: '17796479580'
  })
  @IsMobilePhone('zh-CN')
  @Column({
    length: 11,
    unique: true
  })
  mobile: string;

  @ApiProperty({
    description: '用户头像地址'
  })
  @Column()
  avatar: string;

  @ApiProperty({
    description: '个性签名'
  })
  @Column({
    length: 128
  })
  slogan: string;

  @ApiProperty({
    description: '用户标签'
  })
  @Column({
    type: 'varchar',
    length: 64
  })
  @Transform((params) => {
    const obj = params.obj;
    const tags = obj.tags || '';
    if (typeof tags === 'string') {
      return tags.split(',');
    }
  })
  tags: string[];
}
