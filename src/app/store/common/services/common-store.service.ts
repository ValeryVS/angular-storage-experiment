import { Http } from '@angular/http';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

export class CommonStoreService<RootState> {

  constructor(
    protected http: Http,
    protected store: Store<RootState>,
    protected actions$: Actions,
  ) { }

}
