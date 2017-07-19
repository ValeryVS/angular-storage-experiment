import { ActionFactory, actionFactoryGeneric } from '../../common/actions';
import * as fromRoot from '../../reducer';

export const actionFactory: ActionFactory<fromRoot.RootState> = actionFactoryGeneric;
