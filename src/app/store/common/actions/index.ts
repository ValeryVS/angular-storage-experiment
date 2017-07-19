import { Action } from '@ngrx/store';

export const GET_ALL = 'getAll';
export type GET_ALL = 'getAll';
export const GET_ALL_COMPLETE = 'getAllComplete';
export type GET_ALL_COMPLETE = 'getAllComplete';

export interface GenericAction<T> extends Action {
  readonly type: string;
  storeName: string;
  payload?: T;
}

export type GetAllAction = GenericAction<void>;

export type GetAllCompleteAction = GenericAction<any>;

export function getFullActionName(
  actionName: string,
  storeName: string | symbol | number,
) {
  return `[${storeName}] ${actionName}`;
}

export interface ActionFactory<T> {
  (actionName: GET_ALL, storeName: keyof T): GetAllAction;
  <P>(actionName: GET_ALL_COMPLETE, storeName: keyof T, payload: P): GetAllCompleteAction;
  <P>(actionName: string, storeName: keyof T, payload?: P): GenericAction<any>;
}

export function actionFactoryGeneric<T>(actionName: GET_ALL, storeName: keyof T): GetAllAction;
export function actionFactoryGeneric<T, P>(actionName: GET_ALL_COMPLETE, storeName: keyof T, payload: P): GetAllCompleteAction;
export function actionFactoryGeneric<T, P>(actionName: string, storeName: keyof T, payload?: P): GenericAction<any> {
  return {
    type: getFullActionName(actionName, storeName),
    storeName,
    payload,
  };
}
