import { GET_ALL_COMPLETE } from '../../common/actions';
import { reducerFactory, saveEntitiesReducer, SimpleArrayState } from '../../common/reducers';
import { Organization } from '../model';

export type State = SimpleArrayState<Organization>;

export function createReducer(storeName: string) {
  return reducerFactory<State>(
    storeName,
    {
      touched: false,
      ids: [],
      entities: {},
    },
    {
      [GET_ALL_COMPLETE]: saveEntitiesReducer,
    },
  );
}
