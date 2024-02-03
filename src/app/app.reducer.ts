import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAdmin from './admin/admin-store/admin.reducer';
import * as fromVisitor from './visitor/visitor-store/visitor.reducer';
import * as fromUi from './shared/ui-store/ui.reducer'


export interface SuringarState {
    admin: fromAdmin.AdminState;
    visitor: fromVisitor.VisitorState;
    ui: fromUi.UiState
}

export const reducers: ActionReducerMap<SuringarState> = {
    admin: fromAdmin.adminReducer,
    visitor: fromVisitor.visitorReducer,
    ui: fromUi.uiReducer
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
export const getVisitorImageUrl = createSelector(getVisitorState, fromVisitor.getImageUrl);
export const getVisitorIndexCurrentSlide = createSelector(getVisitorState, fromVisitor.getIndexCurrentSlide);

export const getUiState = createFeatureSelector<fromUi.UiState>('ui');
export const getDeviceType = createSelector(getUiState, fromUi.getDeviceType)








