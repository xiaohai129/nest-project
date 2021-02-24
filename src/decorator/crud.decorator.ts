import { applyDecorators } from '@nestjs/common';
import { Api } from './api.decorator';

export function Crud123() {
  class BaseCrud {
    @Api({
      route: 'add',
      method: 'POST',
      title: '添加'
    })
    add() {
      return '';
    }
  }

  return function <T extends new (...args: any[]) => any>(constructor: T) {
    const className = constructor.name;
    return class extends constructor {
      add() {
        return '12121';
      }
    };
  };

  // return function <T extends new (...args: any[]) => any>(constructor: T) {
  //   const className = constructor.name;
  //   return constructor;
  // };

  // return (target: any) => {
  //   const className = target.name;
  //   if (className.includes('Controller')) {
  //     return function <T extends new (...args: any[]) => any>(constructor: T) {
  //       // constructor.prototype.getName = () => {
  //       //   console.log('xxxx');
  //       // }
  //       console.log(constructor);

  //       return class extends constructor {
  //         name = 'lee';
  //         getName() {
  //           return this.name;
  //         }
  //       };
  //     };
  //   }
  //   return target;
  // };
}
