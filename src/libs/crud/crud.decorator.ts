/* eslint-disable @typescript-eslint/no-empty-function */
import { DECORATORS as SWCONSTANTS } from '@nestjs/swagger/dist/constants';
import { CRUD_METHOD_GET, CRUD_METHOD_GETLIST, CRUD_METHOD_UPDATE, CRUD_METHOD_DELETE, CRUD_METHOD_CREATE } from './constants';

export function Crud(options?: {
  methods?: {
    [CRUD_METHOD_GET]?: boolean;
    [CRUD_METHOD_GETLIST]?: boolean;
    [CRUD_METHOD_UPDATE]?: boolean;
    [CRUD_METHOD_CREATE]?: boolean;
    [CRUD_METHOD_DELETE]?: boolean;
  };
  exclude?: {
    [CRUD_METHOD_GET]?: boolean;
    [CRUD_METHOD_GETLIST]?: boolean;
    [CRUD_METHOD_UPDATE]?: boolean;
    [CRUD_METHOD_CREATE]?: boolean;
    [CRUD_METHOD_DELETE]?: boolean;
  };
}) {
  return (target: any) => {
    const tag = (Reflect.getMetadata(SWCONSTANTS.API_TAGS, target) as string[]) || [];
    const tagStr = tag.join('、');
    const methods = (options || {}).methods || {
      [CRUD_METHOD_GET]: true,
      [CRUD_METHOD_GETLIST]: true,
      [CRUD_METHOD_UPDATE]: true,
      [CRUD_METHOD_CREATE]: true,
      [CRUD_METHOD_DELETE]: true
    };
    const exclude = (options || {}).exclude || {
      [CRUD_METHOD_GET]: false,
      [CRUD_METHOD_GETLIST]: false,
      [CRUD_METHOD_UPDATE]: false,
      [CRUD_METHOD_CREATE]: false,
      [CRUD_METHOD_DELETE]: false
    };
    if (methods[CRUD_METHOD_GET] && !exclude[CRUD_METHOD_GET]) {
      Reflect.defineMetadata(SWCONSTANTS.API_OPERATION, { summary: `获取${tagStr}详情` }, target.prototype[CRUD_METHOD_GET]);
    } else {
      Reflect.defineMetadata(SWCONSTANTS.API_EXCLUDE_ENDPOINT, { disable: true }, target.prototype[CRUD_METHOD_GET]);
      target.prototype[CRUD_METHOD_GET] = () => {};
    }

    if (methods[CRUD_METHOD_GETLIST] && !exclude[CRUD_METHOD_GETLIST]) {
      Reflect.defineMetadata(SWCONSTANTS.API_OPERATION, { summary: `获取${tagStr}列表` }, target.prototype[CRUD_METHOD_GETLIST]);
    } else {
      Reflect.defineMetadata(SWCONSTANTS.API_EXCLUDE_ENDPOINT, { disable: true }, target.prototype[CRUD_METHOD_GETLIST]);
      target.prototype[CRUD_METHOD_GETLIST] = () => {};
    }

    if (methods[CRUD_METHOD_UPDATE] && !exclude[CRUD_METHOD_UPDATE]) {
      Reflect.defineMetadata(SWCONSTANTS.API_OPERATION, { summary: `更新${tagStr}信息` }, target.prototype[CRUD_METHOD_UPDATE]);
    } else {
      Reflect.defineMetadata(SWCONSTANTS.API_EXCLUDE_ENDPOINT, { disable: true }, target.prototype[CRUD_METHOD_UPDATE]);
      target.prototype[CRUD_METHOD_UPDATE] = () => {};
    }

    if (methods[CRUD_METHOD_DELETE] && !exclude[CRUD_METHOD_DELETE]) {
      Reflect.defineMetadata(SWCONSTANTS.API_OPERATION, { summary: `删除${tagStr}信息` }, target.prototype[CRUD_METHOD_DELETE]);
    } else {
      Reflect.defineMetadata(SWCONSTANTS.API_EXCLUDE_ENDPOINT, { disable: true }, target.prototype[CRUD_METHOD_DELETE]);
      target.prototype[CRUD_METHOD_DELETE] = () => {};
    }

    if (methods[CRUD_METHOD_CREATE] && !exclude[CRUD_METHOD_CREATE]) {
      Reflect.defineMetadata(SWCONSTANTS.API_OPERATION, { summary: `创建${tagStr}信息` }, target.prototype[CRUD_METHOD_CREATE]);
    } else {
      Reflect.defineMetadata(SWCONSTANTS.API_EXCLUDE_ENDPOINT, { disable: true }, target.prototype[CRUD_METHOD_CREATE]);
      target.prototype[CRUD_METHOD_CREATE] = () => {};
    }
  };
}
