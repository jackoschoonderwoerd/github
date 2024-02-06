import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { SlickCarouselModule } from 'ngx-slick-carousel';

import { Router } from '@angular/router';
import * as fromRoot from './../../../../../app.reducer'
import { Store } from '@ngrx/store';
import * as VISITOR from '../../../../visitor-store/visitor.actions'
import { MatIconModule } from '@angular/material/icon';
import { NgxImageZoomModule } from 'ngx-image-zoom';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [SlickCarouselModule, CommonModule, MatButtonModule, MatIconModule, NgxImageZoomModule],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {

    indexCurrentSlide: number = 0;
    slideConfig = {

    };

    constructor(

        private router: Router,
        private store: Store<fromRoot.SuringarState>) { }

    @Input() imgUrls: string[] = []


    ngOnInit(): void {
        if (this.imgUrls) {
            this.store.select(fromRoot.getVisitorIndexCurrentSlide).subscribe((index: number) => {
                if (index) {
                    console.log(index);
                    this.indexCurrentSlide = index;
                    this.slideConfig = {
                        // dots: true,
                        // arrows: false,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: index,
                        lazyload: true,
                        prevArrow: false,
                        nextArrow: false,
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
                            {
                                "breakpoint": 992,
                                "settings": {
                                    // "arrows": true,
                                    // "infinite": true,
                                    // "slidesToShow": 1,
                                    // "slidesToScroll": 1
                                }
                            },
                            {
                                "breakpoint": 768,
                                "settings": {
                                    // "arrows": true,
                                    // "infinite": true,
                                    // "slidesToShow": 1,
                                    // "slidesToScroll": 1
                                }
                            }
                        ]
                    }
                } else {
                    this.slideConfig = {
                        // dots: true,
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0,
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
            })
        }
    }

    onLargeImage(imgUrl: string) {
        console.log(imgUrl)
        this.store.dispatch(new VISITOR.SetImageUrl(imgUrl))
        // this.dialog.open(LargeImageComponent, {
        //     data: {
        //         imgUrl
        //     }
        // })
        this.router.navigate(['large-image'])
        // this.router.navigateByUrl('large-image')
    }

    slickInit(e) {
        // console.log('slick initialized');
    }

    breakpoint(e) {
        // console.log('breakpoint');
    }

    afterChange(e) {
        // console.log('afterChange', e, e.currentSlide);
        this.indexCurrentSlide = e.currentSlide;
        this.store.dispatch(new VISITOR.SetIndexCurrentSlide(e.currentSlide))
    }

    beforeChange(e) {
        // console.log('beforeChange');
    }
}
