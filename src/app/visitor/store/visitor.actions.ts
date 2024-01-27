import { Action } from "@ngrx/store";

export const CATEGORY_ID = '[Visitor] Category Id';
export const PRODUCT_ID = '[Visitor] Product Id';

export class SetCategoryId implements Action {
    readonly type = CATEGORY_ID;
    constructor(public categoryId: string) { }
}
export class SetProductId implements Action {
    readonly type = PRODUCT_ID;
    constructor(public productId: string) { }
}

export type VisitorActions =
    SetCategoryId |
    SetProductId
