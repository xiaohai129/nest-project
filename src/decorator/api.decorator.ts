import { applyDecorators, RequestMapping, RequestMethod, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ParameterObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { XAuthGuard } from 'src/guard/auth.guard';

export type RoleType = 'update' | 'add' | 'delete' | 'put' | 'get';

interface ApiOptions {
  route: string;
  title: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
  tags?: string[];
  parameters?: (ParameterObject | ReferenceObject)[];
  auth?: boolean;
  roles?: RoleType[];
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
    decorators.push(UseGuards(XAuthGuard));
    if (data.roles && data.roles.length != 0) {
      decorators.push(SetMetadata('roles', data.roles));
    }
  }

  return applyDecorators(...decorators);
}
