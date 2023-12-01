
import { CATEGORY_ID, IMAGE_URL, PRODUCT_ID } from "./admin.actions"

export interface AdminState {
    categoryId: string;
    productId: string;
    imageUrl: string
}

let initialState: AdminState = {
    categoryId: null,
    productId: null,
    imageUrl: null
}

// export function setAdminStateFromLs(adminStateFromLS: AdminState) {
//     initialState = adminStateFromLS;
// }



export function adminReducer(state = initialState, action: any) {
    // const router = new Router
    // if (localStorage.getItem('adminDataLS')) {
    //     const adminDataLS: AdminDataLS = JSON.parse(localStorage.getItem('adminDataLS'))
    //     // if (adminDataLS && adminDataLS.expirationTimeStamp > Date.now()) {
    //     if (adminDataLS) {
    //         console.log(adminDataLS);
    //         state = adminDataLS.adminState
    //     } else {
    //         console.log('data persistance cancelled due to incativity');
    //         this.router.navigateByUrl('auth/login')
    //     }
    // }
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
            return {
                ...state,
                imageUrl: action.imageUrl
            }
        }
        default: {
            return state
        }
    }
}



export const getCategoryId = (adminState: AdminState) => adminState.categoryId;
export const getProductId = (adminState: AdminState) => adminState.productId;
export const getImageUrl = (adminState: AdminState) => adminState.imageUrl


