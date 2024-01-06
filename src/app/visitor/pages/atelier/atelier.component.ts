import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-atelier',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './atelier.component.html',
    styleUrls: ['./atelier.component.scss']
})
export class AtelierComponent {
    imagePaths: string[] = [
        '../../../../assets/images/atelier/IMG_8657.jpg',
        '../../../../assets/images/atelier/IMG_8658.jpg',
        '../../../../assets/images/atelier/IMG_8659.jpg',
        '../../../../assets/images/atelier/IMG_8666.jpg',
        '../../../../assets/images/atelier/IMG_8679.jpg'
    ]
}
