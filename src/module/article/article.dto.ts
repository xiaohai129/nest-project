import { OmitType } from '@nestjs/swagger';
import { Article } from './article.entity';

export class ArticleAddParamsDto extends OmitType(Article, ['id', 'createDate', 'updateDate']) {}
