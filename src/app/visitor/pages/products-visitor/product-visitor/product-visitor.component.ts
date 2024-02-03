import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ImageSliderComponent } from './image-slider/image-slider.component';

import * as fromRoot from './../../../../app.reducer'
import { Store } from '@ngrx/store';
import { CmPipe } from 'src/app/shared/pipes/cm.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselComponent } from './carousel/carousel.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { User as FirebaseUser } from "@angular/fire/auth";
import { MatIconModule } from '@angular/material/icon';
import { Category } from 'src/app/shared/models/category.model';
import * as VISITOR from './../../../visitor-store/visitor.actions'



@Component({
    selector: 'app-product-visitor',
    standalone: true,
    imports: [
        CommonModule,
        ImageSliderComponent,
        CmPipe,
        FlexLayoutModule,
        CarouselComponent,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule
    ],
    templateUrl: './product-visitor.component.html',
    styleUrls: ['./product-visitor.component.scss']
})
export class ProductVisitorComponent implements OnInit {

    imgUrls: string[] = [];
    isLoading: boolean = true;
    isLoggedIn: boolean = false;
    category$: Observable<any>;
    categoryId: string;
    productId: string;



    constructor(
        public afAuth: Auth,
        private fsService: FirestoreService,
        private store: Store<fromRoot.SuringarState>) { }

    product$: Observable<any>

    ngOnInit(): void {
        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.isLoggedIn = true;
            }
        })
        this.store.select(fromRoot.getVisitorCategoryId).subscribe((categoryId: string) => {
            this.categoryId = categoryId
            this.store.select(fromRoot.getVisitorProductId).subscribe((productId: string) => {
                this.productId = productId
                const pathToProduct = `categories/${categoryId}/products/${productId}`
                this.product$ = this.fsService.getDoc(pathToProduct).pipe(tap(() => {
                    this.isLoading = false;
                }))
                this.fsService.getDoc(pathToProduct).subscribe((product: Product) => {
                    if (product) {
                        this.imgUrls = product.imageUrls
                    }
                })
            })

        })
        this.store.select(fromRoot.getVisitorCategoryId).subscribe((categoryId: string) => {
            const pathToCategory = `categories/${categoryId}`;
            this.category$ = this.fsService.getDoc(pathToCategory);
        })

    }
    onPreviousProduct() {
        const pathToProducts = `categories/${this.categoryId}/products`
        this.fsService.collection(pathToProducts).subscribe((products: Product[]) => {
            const index = products.findIndex((product: Product) => {
                return product.id === this.productId
            })
            if (index === 0) {
                const previousProduct: Product = products[products.length - 1]
                this.store.dispatch(new VISITOR.SetCategoryId(this.categoryId))
                this.store.dispatch(new VISITOR.SetProductId(previousProduct.id))
            } else {
                const previousProduct: Product = products[index - 1]
                this.store.dispatch(new VISITOR.SetCategoryId(this.categoryId))
                this.store.dispatch(new VISITOR.SetProductId(previousProduct.id))
            }
        })
    }
    onNextProduct() {
        const pathToProducts = `categories/${this.categoryId}/products`
        this.fsService.collection(pathToProducts).subscribe((products: Product[]) => {
            const index = products.findIndex((product: Product) => {
                return product.id === this.productId
            })
            if (index === products.length - 1) {
                const nextProduct: Product = products[0]
                this.store.dispatch(new VISITOR.SetCategoryId(this.categoryId))
                this.store.dispatch(new VISITOR.SetProductId(nextProduct.id))
            } else {
                const nextProduct: Product = products[index + 1]
                this.store.dispatch(new VISITOR.SetCategoryId(this.categoryId))
                this.store.dispatch(new VISITOR.SetProductId(nextProduct.id))
            }
        })
    }
}
