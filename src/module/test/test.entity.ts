import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {
  @ApiProperty({
    title: '12121'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    title: '12121'
  })
  @Column()
  name: string;
}
