import { Action, createSelector } from '@ngrx/store';

import { GET_ALL_COMPLETE } from '../../common/actions';
import { getEntities, reducerFactory, saveEntitiesReducer, SimpleArrayState } from '../../common/reducers';
import { User } from '../model';

export interface State extends SimpleArrayState<User> {
  currentUserId?: number;
}

export function createReducer(storeName: string) {
  return reducerFactory<State>(
    storeName,
    {
      touched: false,
      ids: [],
      entities: {},
      currentUserId: undefined,
    },
    {
      [GET_ALL_COMPLETE]: (state: State, action: Action) => {
        const newState: State = saveEntitiesReducer(state, action as any);
        newState.currentUserId = state.currentUserId;
        return newState;
      },
      logInComplete: (state: State, action: any) => {
        // TODO
        // action & action.payload typings
        return {
          touched: state.touched,
          ids: state.ids,
          entities: state.entities,
          currentUserId: action.payload,
        };
      },
    },
  );
}

export const getCurrentUserId = (state: State) => state.currentUserId;
export const getCurrentUser = createSelector(getEntities, getCurrentUserId, (entities, currentUserId) => {
  if (currentUserId) {
    return entities[currentUserId];
  }
});
