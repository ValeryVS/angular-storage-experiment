import { getValidatorError, validator } from '../../../helpers/validator';
import { Organization } from '../../organization/model';

const serializeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    lastName: {
      type: 'string',
    },
    middleName: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    organizationId: {
      type: 'integer',
    },
    role: {
      type: 'string',
    },
  },
  required: [
    'lastName',
    'name',
    'role',
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

export interface User {
  id: number;
  name: string;
  middleName: string;
  lastName: string;
  role: 'admin' | 'user';
  organizationId: number;
}

export interface UserDenormalized extends User {
  organization: Organization;
}

export function serializeUser(data: any): User {
  if (!serializeValidate(data)) {
    throw getValidatorError();
  }
  return data;
}

export function deserializeUser(data: any): User {
  if (!deserializeValidate(data)) {
    throw getValidatorError();
  }
  return data;
}
