import { Action } from "@ngrx/store";

export const CATEGORY = '[Admin] Category'

export class SetCategory implements Action {
    readonly type = CATEGORY;
    constructor(public category: string) {

    }
}

export type AdminActions = SetCategory
