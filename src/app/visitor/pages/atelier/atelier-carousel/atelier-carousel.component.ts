import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
    selector: 'app-atelier-carousel',
    standalone: true,
    imports: [SlickCarouselModule, CommonModule],
    templateUrl: './atelier-carousel.component.html',
    styleUrl: './atelier-carousel.component.scss'
})
export class AtelierCarouselComponent {
    @Input() imgUrls: string[] = []
    slideConfig = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // "slidesToShow": 4,
        // "slidesToScroll": 4,
        // "fade": true,
        // "autoplay": false,
        // "dots": true,
        // "autoplaySpeed": 5000,
        // "pauseOnHover": true,
        // infinite: true,
        // "arrows": true,
        // "variableWidth": true,
        // "centerMode": true,
        // "centerPadding": '60px',
        "responsive": [
            // {
            //     "breakpoint": 992,
            //     "settings": {
            //         "arrows": true,
            //         "infinite": true,
            //         "slidesToShow": 1,
            //         "slidesToScroll": 1
            //     }
            // },
            // {
            //     "breakpoint": 768,
            //     "settings": {
            //         "arrows": true,
            //         "infinite": true,
            //         "slidesToShow": 1,
            //         "slidesToScroll": 1
            //     }
            // }
        ]
    }
}
