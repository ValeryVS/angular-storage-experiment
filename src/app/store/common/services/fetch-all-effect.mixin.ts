import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { actionFactoryGeneric } from '../../common/actions';
import { GET_ALL, GET_ALL_COMPLETE } from '../../common/actions';
import { effectFactory } from '../../common/effects';
import { Constructor } from './constructor.type';
import { WithFetchAll } from './fetch-all.mixin';

export interface FetchAllEffectDecor {
  readonly fetchAllEffect$: Observable<Action>;
}

export function FetchAllEffectMixin<
  RootState,
  Item,
  T extends Constructor<WithFetchAll<RootState, Item>>
  = Constructor<WithFetchAll<RootState, Item>>>(

  Base: T,
  storeName: keyof RootState,

) {

  class WIthFetchAllEffect extends Base {

    public readonly fetchAllEffect$: Observable<Action>;

    constructor(...args: any[]) {
      super(...args);
      this.fetchAllEffect$ = effectFactory<RootState, Item[]>(this.actions$, GET_ALL, storeName, this.fetchAll$)
        .map((entities) => actionFactoryGeneric<RootState, Item[]>(GET_ALL_COMPLETE, storeName, entities));
    }

  }

  return WIthFetchAllEffect;

}
