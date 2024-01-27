import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AtelierService {

    constructor() { }

    imgUrls: string[] = [
        '../../../../assets/images/atelier/IMG_8657.jpg',
        '../../../../assets/images/atelier/IMG_8658.jpg',
        '../../../../assets/images/atelier/IMG_8659.jpg',
        '../../../../assets/images/atelier/IMG_8666.jpg',
        '../../../../assets/images/atelier/IMG_8679.jpg'
    ]

    getImgUrls() {
        return this.imgUrls;
    }
}
