import { EventEmitter, Injectable } from '@angular/core';
import { ProductIds } from '../models/product-ids';

@Injectable({
    providedIn: 'root'
})
export class UiService {

    showHeaderFooter = new EventEmitter<boolean>
    productIdsChanged = new EventEmitter<ProductIds>


    constructor() { }
}
