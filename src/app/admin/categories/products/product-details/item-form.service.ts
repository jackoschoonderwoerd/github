import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ItemFormService {

    readonly form = inject(FormBuilder).group({
        // GENERAL
        id: [],
        hidden: [],
        name: [null, Validators.required],
        description: [],
        price: [],
        imageUrls: [],
        // BASS
        size: [],
        model: [],
        scale: [],
        typeOfWood: [],
        origin: [],
        backboard: [],
        color: [],
        yearBuilt: [],
        bridge: [],
        mensuur: [],
        stringLength: [],
        top: [],
        middle: [],
        bottom: [],
        depth: [],
        lengthBackPlate: [],
        // AMPLIFIER
        type: [],
        output: [],
        weight: [],
        material: [],
    })

    constructor() { }


}
