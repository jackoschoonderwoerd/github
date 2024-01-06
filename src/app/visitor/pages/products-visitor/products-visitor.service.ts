import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProductsVisitorService {

    imageUrlsChanged = new EventEmitter<string[]>

    constructor() { }
}
