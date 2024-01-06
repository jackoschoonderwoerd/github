import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { MatExpansionModule } from '@angular/material/expansion';

import { DocumentReference } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ImageBlowupComponent } from 'src/app/admin/categories/products/add-product/images/image-blowup/image-blowup.component';
// import { IvyCarouselModule } from 'angular-responsive-carousel';

@Component({
    selector: 'app-products-visitor',
    standalone: true,
    imports: [
        CommonModule,
        MatExpansionModule,

        MatIconModule,
        MatButtonModule,
        MatDialogModule
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
    category$: Observable<any>

    constructor(
        private route: ActivatedRoute,
        private fsService: FirestoreService,
        private dialog: MatDialog,
        private router: Router


    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            console.log(params.categoryId);
            this.categoryId = params.categoryId;
            const pathToCategory = `categories/${this.categoryId}`
            this.category$ = this.fsService.getDoc(pathToCategory)
            const pathToProducts = `categories/${this.categoryId}/products`
            this.products$ = this.fsService.collection(pathToProducts);
            this.fsService.collection(pathToProducts).subscribe((products: Product[]) => {
                this.products = products;
            })

        })

    }
    onProductSelected(productId: string) {
        console.log(productId)
        // const pathToProduct = `categories/${this.categoryId}/products/${productId}`;
        // this.product$ = this.fsService.getDoc(pathToProduct);
        // this.fsService.getDoc(pathToProduct).subscribe((product: Product) => {
        //     this.product = product
        // })
        this.router.navigate(['product-visitor', { categoryId: this.categoryId, productId }])

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
        this.dialog.open(ImageBlowupComponent, {
            data: {
                imageUrl
            }
        })
    }

}
