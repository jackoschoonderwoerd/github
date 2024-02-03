import { SuringarState } from "src/app/app.reducer";
import { CATEGORY_ID, IMAGE_URL, INDEX_CURRENT_SLIDE, PRODUCT_ID } from "./visitor.actions";

export interface VisitorState {
    categoryId: string;
    productId: string;
    imageUrl: string;
    indexCurrentSlide: number
}

let initialState: VisitorState = {
    categoryId: null,
    productId: null,
    imageUrl: null,
    indexCurrentSlide: 0
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
        case IMAGE_URL: {
            console.log(action)
            return {
                ...state,
                imageUrl: action.imageUrl
            }
        }
        case INDEX_CURRENT_SLIDE: {
            console.log(action)
            return {
                ...state,
                indexCurrentSlide: action.indexCurrentSlide
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
export const getImageUrl = (visitorState: VisitorState) => visitorState.imageUrl;
export const getIndexCurrentSlide = (visitorState: VisitorState) => visitorState.indexCurrentSlide;
