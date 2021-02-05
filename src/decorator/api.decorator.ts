import { applyDecorators, RequestMapping, RequestMethod, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ParameterObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { XAuthGuard } from 'src/guard/auth.guard';

export type RoleType = 'token' | 'update' | 'add' | 'delete' | 'put' | 'get';

interface ApiOptions {
  route: string;
  title: string;
  method?: 'POST' | 'GET' | 'DELETE' | 'PUT';
  tags?: string[];
  parameters?: (ParameterObject | ReferenceObject)[];
  auth?: RoleType[];
}

export function Api(data: ApiOptions = { method: 'GET' } as any) {
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

  if (data.auth && data.auth.length) {
    decorators.push(ApiBearerAuth('auth'));
    decorators.push(UseGuards(XAuthGuard));
    decorators.push(SetMetadata('roles', data.auth));
  }

  return applyDecorators(...decorators);
}
