
import { CATEGORY_ID, PRODUCT_ID } from "./admin.actions"

export interface AdminState {
    categoryId: string;
    productId: string;
}

let initialState: AdminState = {
    categoryId: null,
    productId: null
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
        default: {
            return state
        }
    }
}



export const getCategoryId = (adminState: AdminState) => adminState.categoryId;
export const getProductId = (adminState: AdminState) => adminState.productId;


