import { compose } from '@ngrx/core/compose';
import { ActionReducer } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { createSelector } from 'reselect';

import { environment } from '../../environments/environment';

import { ActionReducerMap } from './common/reducers/action-reducer-map';
import * as fromOrganization from './organization/reducers';
import * as fromUser from './user/reducers';

export const USER = 'user';
export type USER = 'user';
export const ORGANIZATION = 'organization';
export type ORGANIZATION = 'organization';

export interface RootState {
  organization: fromOrganization.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<RootState> = {
  organization: fromOrganization.createReducer(ORGANIZATION),
  user: fromUser.createReducer(USER),
};

const developmentReducer: ActionReducer<RootState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<RootState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

