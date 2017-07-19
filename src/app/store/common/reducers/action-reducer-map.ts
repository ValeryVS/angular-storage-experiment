import { Action, ActionReducer } from '@ngrx/store';

export type ActionReducerMap<T, V extends Action = Action> = {
  [p in keyof T]: ActionReducer<T[p]>
};
