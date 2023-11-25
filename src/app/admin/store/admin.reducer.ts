
import { CATEGORY } from "./admin.actions"

export interface AdminState {
    category: string
}

let initialState: AdminState = {
    category: null,
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
        case CATEGORY: {
            return {
                ...state,
                category: action.category
            }
        }
        default: {
            return state
        }
    }
}



export const getCategory = (adminState: AdminState) => adminState.category;


