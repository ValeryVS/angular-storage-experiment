import { SelectorFactory, selectorFactoryGeneric } from '../../common/reducers';
import * as fromRoot from '../../reducer';

export const selectorFactory: SelectorFactory<fromRoot.RootState> = selectorFactoryGeneric;
