import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { getFullActionName } from '../actions';

export function effectFactory<S, T>(
  actions$: Actions,
  actionName: string,
  storeName: keyof S,
  source: Observable<T>,
  debounceTime = 300,
) {
  const actionFullName = getFullActionName(actionName, storeName);
  return actions$
    .ofType(actionFullName)
    .debounceTime(debounceTime)
    .switchMap((action) => {
      const nextSearch$ = actions$.ofType(actionFullName).skip(1);

      return source.takeUntil(nextSearch$);
    });
}
