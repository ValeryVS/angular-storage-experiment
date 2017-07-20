import { Observable } from 'rxjs/Observable';

import { CommonStoreService } from './common-store.service';
import { Constructor } from './constructor.type';

export type WithFetchAll<RootStore, Item> = CommonStoreService<RootStore> & {
  readonly fetchAll$: Observable<Item[]>;
};

export function FetchAllMixin<
  RootStore,
  Item,
  T extends Constructor<CommonStoreService<RootStore>>
  = Constructor<CommonStoreService<RootStore>>>(

  Base: T,
  fetchUrl: string,
  deserializeItem: (item: any) => Item,

): Constructor<WithFetchAll<RootStore, Item>> {

  class WithFetchAll extends Base {

    public readonly fetchAll$: Observable<Item[]>;

    constructor(...args: any[]) {
      super(...args);
      this.fetchAll$ = this.http.get(fetchUrl)
        .map((res) => {
          const entities: Item[] = [];
          for (const item of res.json()) {
            entities.push(deserializeItem(item));
          }
          return entities;
        });

    }

  }

  return WithFetchAll;

}
