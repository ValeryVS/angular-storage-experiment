import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { actionFactory } from '../../app/actions';
import { selectorFactory } from '../../app/reducers';
import { GET_ALL, GET_ALL_COMPLETE } from '../../common/actions';
import { effectFactory } from '../../common/effects';
import { getAll, getEntities } from '../../common/reducers';
import * as fromRoot from '../../reducer';
import { deserializeOrganization, Organization } from '../model';

@Injectable()
export class OrganizationService {

  public readonly fetchAll$: Observable<any[]>;

  @Effect()
  public readonly fetchAllEffect$: Observable<Action>;

  protected fetchAllUrl: string;

  constructor(
    private http: Http,
    private store: Store<fromRoot.RootState>,
    private actions$: Actions,
  ) {
    this.fetchAllUrl = 'assets/organization.json';
    this.fetchAll$ = this.http.get(this.fetchAllUrl)
      .map((res) => {
        const entities: Organization[] = [];
        for (const item of res.json()) {
          entities.push(deserializeOrganization(item));
        }
        return entities;
      });
    this.fetchAllEffect$ = effectFactory<any, any>(this.actions$, GET_ALL, fromRoot.ORGANIZATION, this.fetchAll$)
      .map((entities: Organization[]) => actionFactory(GET_ALL_COMPLETE, fromRoot.ORGANIZATION, entities));
  }

  public fetchAll() {
    this.store.dispatch(actionFactory(GET_ALL, fromRoot.ORGANIZATION));
  }

  public getAll() {
    return this.store.select(selectorFactory<fromRoot.ORGANIZATION, Organization[]>(fromRoot.ORGANIZATION, getAll));
  }

  public getEntities() {
    return this.store.select(selectorFactory<fromRoot.ORGANIZATION, { [key: number]: Organization }>(fromRoot.ORGANIZATION, getEntities));
  }

}
