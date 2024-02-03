import { SuringarState } from "src/app/app.reducer";
import { DEVICE_TYPE } from "./ui.actions";

export interface UiState {
    deviceType: string
}

let initialState: UiState = {
    deviceType: null
}

export function setUiStateFromLs(uiStateFromLS: UiState) {
    initialState = uiStateFromLS
}

export function uiReducer(state = initialState, action: any) {
    if (localStorage.getItem('suringarState')) {
        const suringarState: SuringarState = JSON.parse(localStorage.getItem('suringarState'))
        if (suringarState.ui) {
            state = suringarState.ui
        }
    }
    switch (action.type) {
        case DEVICE_TYPE: {
            return {
                ...state,
                deviceType: action.deviceType
            }

        }
        default: {
            return state
        }
    }
}

export const getDeviceType = (uiState: UiState) => uiState.deviceType;
