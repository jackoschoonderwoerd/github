// https://www.npmjs.com/package/ngx-device-detector
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsVisitorService } from '../../products-visitor.service';
import { Observable, take } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Router } from '@angular/router';
import * as fromRoot from './../../../../../app.reducer'
import { Store } from '@ngrx/store';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Product } from 'src/app/shared/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
    selector: 'app-image-slider',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        NgxImageZoomModule,

    ],
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, AfterViewInit {

    private swipeCoord?: [number, number];
    private swipeTime?: number;

    deviceInfo = null;
    isDesktop: boolean = false;
    isMobile: boolean = true;
    isTablet: boolean = true
    interval: any;
    selectedIndex: number = 0;
    iterations: number = 10;
    currentIteration: number = 0;
    // imageUrls: string[] = [];
    product$: Observable<any>
    // @HostListener('click', ['$event']) onClick(event) {
    //     console.log(event.clientX, event.clientY);
    // }
    @Input() imgUrls: string[] = []
    @Input() styles: any;
    url: string


    constructor(
        private deviceService: DeviceDetectorService
    ) { this.getDeviceType(); }

    ngOnInit(): void {
    }
    ngAfterViewInit(): void {


    }
    ngOnChanges(changes: SimpleChanges) {
        // this.url = changes.imgUrls.currentValue[this.selectedIndex]
    }

    onPrevious() {
        if (this.selectedIndex === 0) {
            this.selectedIndex = this.imgUrls.length - 1
        } else if (this.selectedIndex === this.imgUrls.length) {
            this.selectedIndex = 0
        } else {
            this.selectedIndex--
        }
        this.url = this.imgUrls[this.selectedIndex]
        console.log(this.selectedIndex)


    }
    onNext() {
        if (this.selectedIndex === this.imgUrls.length - 1) {
            this.selectedIndex = 0
        } else {
            this.selectedIndex++
        }
        this.url = this.imgUrls[this.selectedIndex]
        console.log(this.selectedIndex)
    }







    swipe(e: TouchEvent, when: string): void {

        const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        const time = new Date().getTime();

        if (when === 'start') {
            this.swipeCoord = coord;
            this.swipeTime = time;
        } else if (when === 'end') {
            const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
            const duration = time - this.swipeTime;

            if (duration < 1000 //
                && Math.abs(direction[0]) > 30 // Long enough
                && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough

                direction[0] > 0 ? this.onNext() : this.onPrevious();
            }
        }
    }
    getStyles() {
        return this.styles;
    }
    getDeviceType() {
        console.log('hello `Home` component');
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.isMobile = this.deviceService.isMobile();
        this.isTablet = this.deviceService.isTablet();
        this.isDesktop = this.deviceService.isDesktop();
        console.log(this.deviceInfo);
        console.log('isMobile:', this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
        console.log('isTablet:', this.isTablet);  // returns if the device us a tablet (iPad etc)
        console.log('isDesktop:', this.isDesktop); // returns if the app is running on a Desktop browser.
    }
}
