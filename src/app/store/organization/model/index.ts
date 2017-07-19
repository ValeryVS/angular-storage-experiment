import { getValidatorError, validator } from '../../../helpers/validator';

const serializeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
  },
  required: [
    'name',
  ],
};

const deserializeSchema = {
  type: serializeSchema.type,
  properties: serializeSchema.properties,
  required: [
    ...serializeSchema.required,
    'id',
  ],
};

const serializeValidate = validator.compile(serializeSchema);
const deserializeValidate = validator.compile(deserializeSchema);

export interface Organization {
  id: number;
  name: string;
}

export function serializeOrganization(data: any): Organization {
  if (!serializeValidate(data)) {
    throw getValidatorError();
  }
  return data;
}

export function deserializeOrganization(data: any): Organization {
  if (!deserializeValidate(data)) {
    throw getValidatorError();
  }
  return data;
}
