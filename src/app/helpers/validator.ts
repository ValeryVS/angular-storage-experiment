import * as Ajv from 'ajv';

export const validator = new Ajv();

export function getValidatorError() {
  if (validator.errors && validator.errors.length > 0) {
    return new Error(validator.errors.map((error) => error.message).join('; '));
  } else {
    return new Error('Entity is not valid');
  }
}
