import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ItemFormService {

    readonly form = inject(FormBuilder).group({
        id: [''],
        hidden: [''],
        name: ['', [Validators.required]],
        description: [''],
        price: [],
        // BASS
        size: [''],
        model: [''],
        scale: [''],
        typeOfWood: [''],
        origin: [''],
        backboard: [''],
        color: [''],
        yearBuilt: [''],
        bridge: [''],
        mensuur: [''],
        stringLength: [''],
        top: [''],
        middle: [''],
        bottom: [''],
        depth: [''],
        lengthBackplate: [''],
        // AMPLIFIER
        type: [''],
        output: [''],
        weight: [''],
        material: [''],
    })

    constructor() { }


}
