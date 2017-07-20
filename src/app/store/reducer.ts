import { ActionReducer, ActionReducerMap } from '@ngrx/store';

import { environment } from '../../environments/environment';

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

export const reducers = {} as ActionReducerMap<RootState>;
reducers.organization = fromOrganization.createReducer(ORGANIZATION);
reducers.user = fromUser.createReducer(USER);

export function logger(reducer: ActionReducer<RootState>): ActionReducer<any, any> {
  return (state: RootState, action: any): RootState => {
    // tslint:disable-next-line:no-console
    console.log('state', state);
    // tslint:disable-next-line:no-console
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: Array<ActionReducer<any, any>> = !environment.production
  ? [logger]
  : [];
