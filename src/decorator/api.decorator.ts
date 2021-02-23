import { applyDecorators, RequestMapping, RequestMethod, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { ParameterObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { Exclude, Expose } from 'class-transformer';
import { AuthGuard } from 'src/guard/auth.guard';
import { Column, ColumnOptions } from 'typeorm';
import { DateColumn, DateColumnType } from './date-column.decorator';

export type RoleType = 'update' | 'add' | 'delete' | 'put' | 'get';

interface ApiBodyOptions {
  in: 'body';
  body: Record<string, any>;
}

interface ApiOptions {
  route: string;
  title: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
  tags?: string[];
  parameters?: (ParameterObject | ApiBodyOptions)[];
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
      const param = data.parameters[i];
      if (param.in === 'body') {
        decorators.push(
          ApiBody({
            schema: {
              properties: param.body
            }
          })
        );
      } else {
        decorators.push(ApiParam(param));
      }
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

interface ApiFieldOptions extends ApiPropertyOptions {
  expose?: boolean;
  exclude?: boolean;
}

interface ApiColumnOptions extends ApiFieldOptions {
  column?: ColumnOptions;
  date?: DateColumnType;
}

export function ApiField(options: ApiFieldOptions) {
  const decorators: any[] = [ApiProperty(options)];
  if (options.expose !== false) {
    decorators.push(Expose());
  }
  if (options.exclude) {
    decorators.push(Exclude({ toPlainOnly: true }));
  }
  return applyDecorators(...decorators);
}

export function ApiColumn(options: ApiColumnOptions) {
  const pOptions = JSON.parse(JSON.stringify(options));
  delete pOptions.column;
  delete pOptions.date;
  delete pOptions.isArray;
  const decorators: any[] = [ApiField(pOptions)];
  if (options.date) {
    decorators.push(DateColumn(options.date));
  } else {
    let columnOptions = options.column;
    if (options.isArray) {
      columnOptions = Object.assign(
        {
          type: 'varchar',
          transformer: {
            to(value) {
              return value.join(',');
            },
            from(value) {
              return value.split(',');
            }
          }
        },
        columnOptions || {}
      );
    }
    decorators.push(Column(columnOptions));
  }
  return applyDecorators(...decorators);
}
