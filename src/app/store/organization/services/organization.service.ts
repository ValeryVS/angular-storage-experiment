import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AllInDecor, AllInMixin, CommonStoreService } from '../../common/services';
import * as fromRoot from '../../reducer';
import { deserializeOrganization, Organization } from '../model';

@Injectable()
export class OrganizationService
  extends AllInMixin<fromRoot.RootState, Organization>(
    CommonStoreService,
    fromRoot.USER,
    'assets/organization.json',
    deserializeOrganization,
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

}
