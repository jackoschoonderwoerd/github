import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdmin from './admin/store/admin.reducer';
import * as fromVisitor from './visitor/store/visitor.reducer'


export interface SuringarState {
    admin: fromAdmin.AdminState;
    visitor: fromVisitor.VisitorState
}

export const reducers: ActionReducerMap<SuringarState> = {
    admin: fromAdmin.adminReducer,
    visitor: fromVisitor.visitorReducer
}

// export function setStateFromLs(stateFormLs: SuringarState) {
//     console.log(stateFormLs)
//     if(stateFormLs) {
//         reducers.admin
//     }

//     // reducers.admin
// }

export const getAdminState = createFeatureSelector<fromAdmin.AdminState>('admin');
export const getAdminCategoryId = createSelector(getAdminState, fromVisitor.getCategoryId);
export const getAdminProductId = createSelector(getAdminState, fromVisitor.getProductId);
export const getImageUrl = createSelector(getAdminState, fromAdmin.getImageUrl);

export const getVisitorState = createFeatureSelector<fromVisitor.VisitorState>('visitor');
export const getVisitorCategoryId = createSelector(getVisitorState, fromVisitor.getCategoryId);
export const getVisitorProductId = createSelector(getVisitorState, fromVisitor.getProductId);







