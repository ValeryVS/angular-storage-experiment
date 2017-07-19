import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { actionFactory } from '../../app/actions';
import { selectorFactory } from '../../app/reducers';
import { GET_ALL, GET_ALL_COMPLETE } from '../../common/actions';
import { effectFactory } from '../../common/effects';
import { getAll, getEntities } from '../../common/reducers';
import * as fromRoot from '../../reducer';
import { deserializeUser, User } from '../model';
import { getCurrentUser } from '../reducers';

@Injectable()
export class UserService {

  public readonly fetchAll$: Observable<any[]>;

  @Effect()
  public getAll$: Observable<Action>;

  constructor(
    private http: Http,
    private store: Store<fromRoot.RootState>,
    private actions$: Actions,
  ) {
    this.fetchAll$ = this.http.get('assets/user.json')
      .map((res) => {
        const entities: User[] = [];
        for (const item of res.json()) {
          entities.push(deserializeUser(item));
        }
        return entities;
      });
    this.getAll$ = effectFactory<any, any>(this.actions$, GET_ALL, fromRoot.USER, this.fetchAll$)
      .map((users: User[]) => actionFactory(GET_ALL_COMPLETE, fromRoot.USER, users))
      .catch(() => Observable.of(actionFactory(GET_ALL_COMPLETE, fromRoot.USER, [])));
  }

  public fetchAll() {
    this.store.dispatch(actionFactory(GET_ALL, fromRoot.USER));
  }

  public getAll() {
    return this.store.select(selectorFactory<fromRoot.USER, User[]>(fromRoot.USER, getAll));
  }

  public getEntities() {
    return this.store.select(selectorFactory<fromRoot.USER, { [key: number]: User }>(fromRoot.USER, getEntities));
  }

  public setCurrent(id: number) {
    this.store.dispatch(actionFactory('logInComplete', fromRoot.USER, id));
  }

  public getCurrent() {
    return this.store.select(selectorFactory<fromRoot.USER, User | undefined>(fromRoot.USER, getCurrentUser));
  }

}
