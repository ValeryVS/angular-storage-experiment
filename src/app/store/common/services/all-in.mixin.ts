import { CommonStoreService } from './common-store.service';
import { Constructor } from './constructor.type';
import { FetchAllEffectDecor, FetchAllEffectMixin } from './fetch-all-effect.mixin';
import { FetchAllMixin } from './fetch-all.mixin';
import { GetAllMixin } from './get-all.mixin';

export type AllInDecor = FetchAllEffectDecor;

export function AllInMixin<
  RootState,
  Item,
  T extends Constructor<CommonStoreService<RootState>>
  = Constructor<CommonStoreService<RootState>>>(

  Base: T,
  storeName: keyof RootState,
  fetchUrl: string,
  deserializeItem: (item: any) => Item,

) {

  return class extends GetAllMixin<RootState, Item>(
    FetchAllEffectMixin<RootState, Item>(
      FetchAllMixin(
        Base,
        fetchUrl,
        deserializeItem,
      ),
      storeName,
    ),
    storeName,
  ) { };

}

