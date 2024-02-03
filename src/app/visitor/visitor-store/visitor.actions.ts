import { Action } from "@ngrx/store";

export const CATEGORY_ID = '[Visitor] Category Id';
export const PRODUCT_ID = '[Visitor] Product Id';
export const IMAGE_URL = '[Visitor] Image Url';
export const INDEX_CURRENT_SLIDE = '[Visitor] Index Current Slide';


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

    constructor(public imageUrl: string) {
    }
}
export class SetIndexCurrentSlide implements Action {

    readonly type = INDEX_CURRENT_SLIDE;
    constructor(public indexCurrentSlide: number) { }
}


export type VisitorActions =
    SetCategoryId |
    SetProductId |
    SetImageUrl |
    SetIndexCurrentSlide
