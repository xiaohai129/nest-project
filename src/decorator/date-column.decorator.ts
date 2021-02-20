import { applyDecorators } from '@nestjs/common';
import { dateFormat } from 'src/utils/date-format';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export type DateColumnType = 'UpdateDateColumn' | 'CreateDateColumn' | 'DeleteDateColumn';
export function DateColumn(type: DateColumnType, format = 'YYYY-MM-DD HH:mm:ss') {
  const decorators: any[] = [];
  const transformer = {
    to(value) {
      return value;
    },
    from(value) {
      return dateFormat(value, format);
    }
  };
  if (type === 'CreateDateColumn') {
    decorators.push(CreateDateColumn({ transformer }));
  } else if (type === 'UpdateDateColumn') {
    decorators.push(UpdateDateColumn({ transformer }));
  } else if (type === 'DeleteDateColumn') {
    decorators.push(DeleteDateColumn({ transformer }));
  }
  return applyDecorators(...decorators);
}
