import { applyDecorators, RequestMapping, RequestMethod, SetMetadata, Type, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { ParameterObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Exclude, Expose } from 'class-transformer';
import { AuthGuard } from 'src/guard/auth.guard';
import { Column, ColumnOptions } from 'typeorm';
import { DateColumn, DateColumnType } from './date-column.decorator';

export type RoleType = 'update' | 'add' | 'delete' | 'put' | 'get';

interface ApiOptions {
  route: string;
  title: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
  tags?: string[];
  parameters?: (ParameterObject | ReferenceObject)[];
  auth?: boolean;
  roles?: RoleType[];
  result?: any;
  description?: string;
}

export function Api(data: ApiOptions = { method: 'GET', auth: true } as any) {
  const defaultApiOptions: any = {
    method: 'GET',
    auth: true
  };
  data = Object.assign(defaultApiOptions, data);

  const decorators = [
    RequestMapping({
      method: RequestMethod[data.method],
      path: data.route
    }),
    ApiOperation({
      summary: data.title,
      tags: data.tags
    })
  ] as any[];

  if (data.auth) {
    decorators.push(ApiBasicAuth('auth'));
    decorators.push(UseGuards(AuthGuard));
    if (data.roles && data.roles.length != 0) {
      decorators.push(SetMetadata('roles', data.roles));
    }
  }

  if (data.parameters) {
    for (const i in data.parameters) {
      const param = data.parameters[i] as ParameterObject;
      decorators.push(ApiParam(param));
    }
  }

  const result: any = {
    type: data.result,
    description: data.description
  };
  if (!data.result && !data.description) {
    result.description = '无返回值';
  }
  decorators.push(ApiOkResponse(result));

  return applyDecorators(...decorators);
}

interface ApiColumnOptions extends ApiPropertyOptions {
  expose?: boolean;
  exclude?: boolean;
  column?: ColumnOptions;
  date?: DateColumnType;
}
export function ApiColumn(options: ApiColumnOptions) {
  const decorators: any[] = [ApiProperty({})];
  if (options.expose) {
    decorators.push(Expose());
  }
  if (options.exclude) {
    decorators.push(Exclude({ toPlainOnly: true }));
  }
  if (options.date) {
    decorators.push(DateColumn(options.date));
  } else {
    decorators.push(Column(options.column || {}));
  }
  return applyDecorators(...decorators);
}
