import { Action } from "@ngrx/store";

export const CATEGORY_ID = '[Admin] Category';
export const PRODUCT_ID = '[Admin] Product Id'

export class SetCategoryId implements Action {
    readonly type = CATEGORY_ID;
    constructor(public categoryId: string) { }
}
export class SetProductId implements Action {
    readonly type = PRODUCT_ID;
    constructor(public productId: string) { }
}

export type AdminActions = SetCategoryId | SetProductId

