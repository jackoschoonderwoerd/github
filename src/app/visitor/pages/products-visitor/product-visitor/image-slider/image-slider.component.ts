import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsVisitorService } from '../../products-visitor.service';
import { take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LargeImageComponent } from './large-image/large-image.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-image-slider',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

    interval: any;
    selectedIndex: number = 0;
    iterations: number = 10;
    currentIteration: number = 0;
    imageUrls: string[] = []


    constructor(
        private productsVisitorService: ProductsVisitorService,
        private dialog: MatDialog,
        private router: Router) { }

    ngOnInit(): void {
        this.productsVisitorService.imageUrlsChanged.pipe(take(1)).subscribe((imageUrls: string[]) => {
            this.imageUrls = imageUrls
            console.log(this.imageUrls)
        })
        // this.interval = setInterval(() => {
        //     this.selectedIndex++;
        //     this.checkIterations();
        // }, 3000);
    }

    onPrevious() {
        if (this.selectedIndex === 0) {
            this.selectedIndex = this.imageUrls.length - 1
        } else if (this.selectedIndex === this.imageUrls.length) {
            this.selectedIndex = 0
        } else {
            this.selectedIndex--
        }
        console.log(this.selectedIndex)
    }
    onNext() {
        if (this.selectedIndex === this.imageUrls.length - 1) {
            this.selectedIndex = 0
        } else {
            this.selectedIndex++
        }
        console.log(this.selectedIndex)
    }

    checkIterations() {
        this.currentIteration++;
        if (this.selectedIndex === this.imageUrls.length) {
            this.selectedIndex = 0
        }
        this.getImageInfo()
    }

    showLargeImageInDialog(index) {
        console.log(index)
        const url = this.imageUrls[this.selectedIndex]
        this.dialog.open(LargeImageComponent, {
            data: {
                url
            }
        })
    }
    showLargeImage(index) {
        console.log(this.selectedIndex)
        const url = this.imageUrls[this.selectedIndex]
        this.router.navigate(['large-image',
            {
                url
            }])
    }

    getImageInfo() {
        const url = this.imageUrls[this.selectedIndex]
        this.getImageSizeFromUrl(url)
            .then((dimensions) => {
                console.log('Image dimensions:', dimensions);
            })
            .catch((error) => {
                console.error('Error loading image:', error);
            });
    }

    getImageSizeFromUrl(imageUrl: string): Promise<{ width: number, height: number }> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = (error) => {
                reject(error);
            };
            img.src = imageUrl;
        });
    }

    // Use like:

}
