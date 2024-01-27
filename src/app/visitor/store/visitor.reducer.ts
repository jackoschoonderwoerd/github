import { SuringarState } from "src/app/app.reducer";
import { CATEGORY_ID, PRODUCT_ID } from "./visitor.actions";

export interface VisitorState {
    categoryId: string;
    productId: string;
}

let initialState: VisitorState = {
    categoryId: null,
    productId: null
}

export function visitorReducer(state = initialState, action: any) {

    if (localStorage.getItem('suringarState')) {
        const suringarState: SuringarState = JSON.parse(localStorage.getItem('suringarState'))
        if (suringarState.visitor) {
            state = suringarState.visitor
        }
    }
    switch (action.type) {
        case CATEGORY_ID: {
            return {
                ...state,
                categoryId: action.categoryId
            }
        }
        case PRODUCT_ID: {
            return {
                ...state,
                productId: action.productId
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export const getCategoryId = (visitorState: VisitorState) => visitorState.categoryId;
export const getProductId = (visitorState: VisitorState) => visitorState.productId;
