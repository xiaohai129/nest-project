import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Api } from 'src/decorator/api.decorator';
import { ClassifyAddParamsDto } from './classify.dto';
import { ClassifyService } from './classify.service';

@Controller('/classify')
@ApiTags('文案分类')
export class ClassifyController {
  constructor(private readonly classifyService: ClassifyService) {}

  @Api({
    route: '/add',
    method: 'POST',
    title: '添加文案分类'
  })
  async add(@Body() parmas: ClassifyAddParamsDto) {
    return await this.classifyService.add(parmas);
  }
}
