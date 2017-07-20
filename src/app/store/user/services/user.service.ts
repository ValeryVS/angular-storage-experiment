import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { actionFactory } from '../../app/actions';
import { selectorFactory } from '../../app/reducers';
import { AllInDecor, AllInMixin, CommonStoreService } from '../../common/services';
import * as fromRoot from '../../reducer';
import { deserializeUser, User } from '../model';
import { getCurrentUser } from '../reducers';

@Injectable()
export class UserService
  extends AllInMixin<fromRoot.RootState, User>(
    CommonStoreService,
    fromRoot.USER,
    'assets/user.json',
    deserializeUser,
  )
  implements AllInDecor {

  @Effect()
  public readonly fetchAllEffect$: Observable<Action>;

  constructor(
    http: Http,
    store: Store<fromRoot.RootState>,
    actions$: Actions,
  ) {
    super(http, store, actions$);
  }

  public setCurrent(id: number) {
    this.store.dispatch(actionFactory('logInComplete', fromRoot.USER, id));
  }

  public getCurrent() {
    return this.store.select(selectorFactory<fromRoot.USER, User | undefined>(fromRoot.USER, getCurrentUser));
  }

}

