import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { MatExpansionModule } from '@angular/material/expansion';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

// import { IvyCarouselModule } from 'angular-responsive-carousel';
import * as fromRoot from './../../../app.reducer'
import { Store } from '@ngrx/store';
import * as VISITOR from '../../visitor-store/visitor.actions'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-products-visitor',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,

    ],
    templateUrl: './products-visitor.component.html',
    styleUrls: ['./products-visitor.component.scss']
})
export class ProductsVisitorComponent implements OnInit {

    products$: Observable<any>
    products: Product[] = []
    product$: Observable<any>
    product: Product;
    categoryId: string;
    imageIndex: number = 0;
    category$: Observable<any>;
    isLoading: boolean = true;

    constructor(
        private fsService: FirestoreService,
        private router: Router,
        private store: Store<fromRoot.SuringarState>


    ) { }

    ngOnInit(): void {

        this.store.select(fromRoot.getVisitorCategoryId).subscribe((categoryId: string) => {
            console.log(categoryId);
            const pathToCategory = `categories/${categoryId}`
            this.category$ = this.fsService.getDoc(pathToCategory)
            const pathToProducts = `categories/${categoryId}/products`
            this.products$ = this.fsService.collection(pathToProducts).pipe(tap(() => {
                this.isLoading = false
            }));
            this.fsService.collection(pathToProducts).subscribe((products: Product[]) => {
                console.log(products)
                this.products = products;
            })
        })
    }
    onProductSelected(productId: string) {
        this.store.dispatch(new VISITOR.SetProductId(productId));
        this.router.navigateByUrl('product-visitor')

    }
    moveImage(direction: string) {
        if (direction === '+') {
            this.imageIndex = this.imageIndex - 1;
        } else {
            this.imageIndex = this.imageIndex + 1;
        }
    }
    onImageSelected(e) {
        console.log(e.src)
        console.log(e.currentSrc)
        console.log(e.target.currentSrc)
        const imageUrl = e.target.currentSrc

    }

}
