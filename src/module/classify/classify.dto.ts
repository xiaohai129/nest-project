import { PickType } from '@nestjs/swagger';
import { Classify } from './classify.entity';

export class ClassifyAddParamsDto extends PickType(Classify, ['title']) {}
