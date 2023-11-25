import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdmin from './admin/store/admin.reducer';


export interface State {
    admin: fromAdmin.AdminState;
}

export const reducers: ActionReducerMap<State> = {
    admin: fromAdmin.adminReducer,
}

// export function setStateFromLs(stateFormLs: State) {
//     console.log(stateFormLs)
//     reducers.admin
// }

export const getAdminState = createFeatureSelector<fromAdmin.AdminState>('admin');
export const getCategory = createSelector(getAdminState, fromAdmin.getCategory)







