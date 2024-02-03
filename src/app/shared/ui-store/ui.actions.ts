import { Action } from '@ngrx/store'

export const DEVICE_TYPE = '[Ui] Device Type'

export class SetDeviceType implements Action {
    readonly type = DEVICE_TYPE;
    constructor(public deviceType: string) { }
}

export const UiActions = SetDeviceType
