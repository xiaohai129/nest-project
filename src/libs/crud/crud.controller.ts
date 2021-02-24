import { Get, Body, Param, Post, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CrudService } from './crud.service';
import { ApiBody, ApiOkResponse, getSchemaPath, ApiProperty, ApiHideProperty, ApiSecurity, ApiOperation, ApiExcludeEndpoint } from '@nestjs/swagger';
import { isEmpty, isInt, validateSync, IsInt, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

export class GetListOptions {
  @ApiProperty({ title: '页数' })
  @IsInt()
  pageNum: number;

  @ApiProperty({ title: '每页条数' })
  @IsInt()
  pageSize: number;
}

export function CrudControllerFactory(model: any) {
  class CrudController {
    public service: CrudService<any>;
    public entity: Repository<any>;

    constructor(service: CrudService<any>) {
      this.service = service;
      this.entity = new Repository();
    }

    validateParams(params: any) {
      const entity = plainToClass(model, params);
      const validateError = validateSync(entity);
      if (validateError.length > 0) {
        const errors = [];
        for (const i in validateError) {
          const constraints = validateError[i].constraints;
          if (!constraints) {
            continue;
          }
          for (const key in constraints) {
            errors.push(constraints[key]);
          }
        }
        throw new HttpException(errors, HttpStatus.BAD_REQUEST);
      }
    }

    // 创建
    @Post()
    @ApiBody({
      type: model
    })
    @ApiOkResponse({
      type: model
    })
    create(@Body() params: any) {
      // this.validateParams(params);
      console.log(params);

      if (params.hasOwnProperty('id')) {
        delete params.id;
      }
      if (params.hasOwnProperty('createTime')) {
        delete params.createTime;
      }
      return this.service.create(params);
    }

    // 查询单条
    @Get(':id')
    @ApiOkResponse({
      type: model
    })
    get(@Param('id') id: number) {
      if (isEmpty(id)) {
        throw new HttpException('id不能为空', HttpStatus.BAD_REQUEST);
      }
      if (!isInt(parseInt(id as any))) {
        throw new HttpException('id必须为整型', HttpStatus.BAD_REQUEST);
      }
      console.log(this.service);

      return this.service.get(id);
    }

    // 查询列表
    @Post('list')
    @ApiOkResponse({
      schema: {
        properties: {
          total: {
            type: 'number'
          },
          list: {
            type: 'array',
            items: { $ref: getSchemaPath(model.name) }
          }
        }
      }
    })
    getList(@Body() options: GetListOptions) {
      return this.service.getList(options);
    }

    // 更新
    @Put()
    @ApiBody({
      type: model
    })
    @ApiOkResponse({
      description: '更新的id'
    })
    update(@Body() params: any) {
      this.validateParams(params);
      if (isEmpty(params.id)) {
        throw new HttpException('id不能为空', HttpStatus.BAD_REQUEST);
      }
      if (!isInt(parseInt(params.id as any))) {
        throw new HttpException('id必须为整型', HttpStatus.BAD_REQUEST);
      }
      if (params.hasOwnProperty('createTime')) {
        delete params.createTime;
      }
      return this.service.update(params);
    }

    // 删除
    @Delete(':id')
    delete(@Param('id') id: number) {
      if (isEmpty(id)) {
        throw new HttpException('id不能为空', HttpStatus.BAD_REQUEST);
      }
      if (!isInt(parseInt(id as any))) {
        throw new HttpException('id必须为整型', HttpStatus.BAD_REQUEST);
      }
      return this.service.delete(id);
    }
  }
  return class extends CrudController {};
}
