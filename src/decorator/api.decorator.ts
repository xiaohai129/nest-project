import { applyDecorators, RequestMapping, RequestMethod, SetMetadata, Type, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiOkResponse, ApiOperation, ApiParam, ApiProperty } from '@nestjs/swagger';
import { ParameterObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { AuthGuard } from 'src/guard/auth.guard';

export type RoleType = 'update' | 'add' | 'delete' | 'put' | 'get';

interface ApiOptions {
  route: string;
  title: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
  tags?: string[];
  parameters?: (ParameterObject | ReferenceObject)[];
  auth?: boolean;
  roles?: RoleType[];
  result: {
    type?: Type<unknown> | string;
    description?: string;
  };
}

const defaultApiOptions: any = {
  method: 'GET',
  auth: true
};

export function Api(data: ApiOptions = { method: 'GET', auth: true } as any) {
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

  if (data.result) {
    decorators.push(ApiOkResponse(data.result));
  }

  return applyDecorators(...decorators);
}
