import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';

export function compare(value1, value2) {
  return value1 === value2;
}

export function Compare(name: string, options?: ValidationOptions) {
  return ValidateBy(
    {
      name: 'Compare',
      validator: {
        validate: (value, args) => {
          const obj = args.object;
          return compare(value, obj[name]);
        },
        defaultMessage: buildMessage((eachPrefix) => eachPrefix + '$property and ' + name + ' must be equal', options)
      }
    },
    options
  );
}
