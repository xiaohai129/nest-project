import { ApiColumn } from 'src/decorator/api.decorator';
import { Entity, ManyToOne } from 'typeorm';
import { Classify } from '../classify/classify.entity';

@Entity()
export class Article {
  @ApiColumn({
    description: '文案ID',
    column: {
      primary: true,
      length: 10
    }
  })
  id: string;

  @ApiColumn({
    description: '文案文本',
    column: {
      type: 'text'
    }
  })
  text: string;

  @ApiColumn({
    description: '文案图片',
    isArray: true
  })
  images: string[];

  @ApiColumn({
    description: '文案视频',
    isArray: true
  })
  videos: string[];

  @ApiColumn({
    description: '文案分类'
  })
  @ManyToOne(
    () => Classify,
    (classify) => {
      return classify.id;
    },
    {
      cascade: true
    }
  )
  classifys: string;

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
