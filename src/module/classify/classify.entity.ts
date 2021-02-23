import { Exclude } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiColumn } from 'src/decorator/api.decorator';
import { Column, Entity } from 'typeorm';

@Entity()
export class Classify {
  @ApiColumn({
    description: '分类ID',
    column: {
      primary: true,
      length: 10
    }
  })
  id: string;

  @ApiColumn({
    description: '分类标题',
    column: {
      length: 6
    }
  })
  @IsNotEmpty()
  @MaxLength(6)
  title: string;

  @Column({
    default: 0
  })
  @Exclude({
    toPlainOnly: true
  })
  heat: number;
}
