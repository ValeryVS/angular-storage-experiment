import { actionFactoryGeneric } from '../../common/actions';
import { GET_ALL } from '../../common/actions';
import { selectorFactoryGeneric } from '../../common/reducers';
import { getAll, getEntities } from '../../common/reducers';
import { CommonStoreService } from './common-store.service';
import { Constructor } from './constructor.type';

export function GetAllMixin<
  RootState,
  Item,
  T extends Constructor<CommonStoreService<RootState>>
  = Constructor<CommonStoreService<RootState>>>(

  Base: T,
  storeName: keyof RootState,

) {

  class WithGetAll extends Base {

    public fetchAll() {
      this.store.dispatch(actionFactoryGeneric<RootState>(GET_ALL, storeName));
    }

    public getAll() {
      return this.store.select(selectorFactoryGeneric<RootState, any, Item[]>(storeName, getAll as any));
    }

    public getEntities() {
      return this.store.select(selectorFactoryGeneric<RootState, any, { [key: number]: Item }>(storeName, getEntities as any));
    }

  }

  return WithGetAll;

}
