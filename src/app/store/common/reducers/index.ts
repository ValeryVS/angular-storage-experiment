import { Action } from '@ngrx/store';
import { createSelector } from 'reselect';

import { GetAllCompleteAction, getFullActionName } from '../actions';

export interface SimpleArrayState<T> {
  touched: boolean;
  ids: number[];
  entities: { [key: number]: T };
}

export const getEntities = <S extends SimpleArrayState<T>, T = any>(state: S) => state.entities;
export const getIds = <S extends SimpleArrayState<any>, T = any>(state: S) => state.ids;
export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map((id) => entities[id]);
});

export function saveEntitiesReducer<T>(state: SimpleArrayState<T>, action: GetAllCompleteAction) {
  const newItems = action.payload;
  const newItemIds = newItems.map((item: any) => item.id);
  const newItemEntities = newItems.reduce(
    (entities: { [id: number]: any }, entity: any) => {
      return Object.assign(entities, {
        [entity.id]: entity,
      });
    },
    {},
  );
  return {
    touched: true,
    ids: newItemIds,
    entities: newItemEntities,
  };
}

export function reducerFactory<T>(
  storeName: string,
  initialState: T,
  rawHandlers: { [key: string]: (state: T, action: Action) => T },
) {
  const handlers: { [key: string]: (state: T, action: Action) => T } = {};
  for (const rawHandlerKey in rawHandlers) {
    if (rawHandlers.hasOwnProperty(rawHandlerKey)) {
      const key = getFullActionName(rawHandlerKey, storeName);
      handlers[key] = rawHandlers[rawHandlerKey];
    }
  }
  return function reducer(state = initialState, action: Action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

export type SelectorFactory<RootState> = <K extends keyof RootState, Result = any>(
  storeName: K,
  selector: (state: RootState[K]) => Result,
) => Reselect.OutputSelector<RootState, Result, (res: RootState[K]) => Result>;

export function selectorFactoryGeneric<RootState, K extends keyof RootState, Result = any>(
  storeName: K,
  selector: (state: RootState[K]) => Result,
) {
  const getState = (state: RootState) => state[storeName];
  return createSelector(getState, selector);
}
