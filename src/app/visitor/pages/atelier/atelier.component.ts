import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtelierService } from './atelier.service';
import { ImageSliderComponent } from '../products-visitor/product-visitor/image-slider/image-slider.component';


@Component({
    selector: 'app-atelier',
    standalone: true,
    imports: [CommonModule, ImageSliderComponent],
    templateUrl: './atelier.component.html',
    styleUrls: ['./atelier.component.scss']
})
export class AtelierComponent implements OnInit {

    imgUrls: string[] = []
    styles = {
        'min-width': '500px',
        'margin': 'auto'
    }

    imagePaths: string[] = [
        '../../../../assets/images/atelier/IMG_8657.jpg',
        '../../../../assets/images/atelier/IMG_8658.jpg',
        '../../../../assets/images/atelier/IMG_8659.jpg',
        '../../../../assets/images/atelier/IMG_8666.jpg',
        '../../../../assets/images/atelier/IMG_8679.jpg'
    ]

    constructor(private atelierService: AtelierService) { }

    ngOnInit(): void {
        this.imgUrls = this.atelierService.getImgUrls()
    }
}
