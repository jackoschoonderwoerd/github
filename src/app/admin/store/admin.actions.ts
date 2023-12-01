import { Action } from "@ngrx/store";

export const CATEGORY_ID = '[Admin] Category';
export const PRODUCT_ID = '[Admin] Product Id';
export const IMAGE_URL = '[Admin] Image Url'

export class SetCategoryId implements Action {
    readonly type = CATEGORY_ID;
    constructor(public categoryId: string) { }
}
export class SetProductId implements Action {
    readonly type = PRODUCT_ID;
    constructor(public productId: string) { }
}
export class SetImageUrl implements Action {
    readonly type = IMAGE_URL;
    constructor(public imageUrl: string) { }
}


export type AdminActions =
    SetCategoryId |
    SetProductId |
    SetImageUrl

