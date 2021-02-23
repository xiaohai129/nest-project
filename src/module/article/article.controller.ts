import { Body, Controller, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Api } from 'src/decorator/api.decorator';
import { ArticleAddParamsDto } from './article.dto';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Controller('/article')
@ApiTags('文案')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Api({
    route: '/add',
    method: 'POST',
    title: '添加文案'
  })
  async add(@Body() params: ArticleAddParamsDto) {
    return await this.articleService.add(params);
  }

  @Api({
    route: '/details',
    title: '文案详情',
    parameters: [{ name: 'id', in: 'query', description: '文案ID' }],
    result: Article
  })
  async get(@Query('id') id: string) {
    return await this.articleService.findById(id);
  }
}
