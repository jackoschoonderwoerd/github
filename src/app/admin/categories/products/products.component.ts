import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { Observable, take } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { FirebaseError } from '@angular/fire/app';
import * as ADMIN from 'src/app/admin/store/admin.actions'


import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-bass/add-product.component';
import { StorageService } from 'src/app/shared/services/storage.service';
import { StorageError } from '@angular/fire/storage';
import { Auth, User as FirebaseUser, onAuthStateChanged } from '@angular/fire/auth';


@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

    title: string = 'ProductsComponent'
    categoryId: Category;
    category$: Observable<DocumentData>;
    category: Category
    products$: Observable<DocumentData>
    user: FirebaseUser;
    user$: Observable<FirebaseUser>
    isLoggedIn: boolean = false

    constructor(
        private store: Store<fromRoot.State>,
        private dialog: MatDialog,
        private fsService: FirestoreService,
        private storageService: StorageService,
        private afAuth: Auth

    ) { }

    ngOnInit(): void {

        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.isLoggedIn = true;
                this.user$ = new Observable<FirebaseUser>((subcriber: any) => {
                    subcriber.next(user)
                })
            }
        })


        this.store.select(fromRoot.getCategoryId).subscribe((categoryId: any) => {
            if (categoryId) {
                // this.categoryId = categoryId
                if (categoryId) {
                    this.categoryId = categoryId;
                    const pathToCategory = `categories/${categoryId}`
                    this.fsService.getDoc(pathToCategory).subscribe((category: Category) => {
                        this.category = category
                    })
                    this.category$ = this.fsService.getDoc(pathToCategory)
                    this.getProducts()
                    const pathToProducts = `categories/${categoryId}/products`
                    this.products$ = this.fsService.collection(pathToProducts)
                    // this.fsService.collection(pathToProducts).subscribe((products: Product[]) => {
                    //     console.log(products)
                    // })
                }
            }
        })
    }

    onEdit(product) {
        // this.store.dispatch(new ADMIN.SetProductId(productId))
        this.dialog.open(AddProductComponent, {
            data: {
                product,
                category: this.category
            }
        })
    }
    onDelete(product: Product) {

        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                message: 'This will permanently delete the product and all of it\'s properties'
            }
        })
        dialogRef.afterClosed().subscribe((status: boolean) => {
            if (status) {
                if (product.imageUrl) {
                    const pathToImageFile = `categories/${this.category.id}/products/${product.id}`
                    this.storageService.deleteObject(pathToImageFile)
                        .then((res: any) => {
                            console.log(`image file deleted; ${res}`)
                        })
                        .catch((err: StorageError) => {
                            console.log(`failed to delete image file; ${err.message}`)
                        })
                }
                const pathToProduct = `categories/${this.category.id}/products/${product.id}`
                this.fsService.deleteDoc(pathToProduct)
                    .then((res: any) => {
                        console.log(`product deleted; ${res}`);
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to delete product; ${err.message}`);
                    });
            }
        })
    }


    onAddProduct() {
        this.store.select(fromRoot.getCategoryId).subscribe((categoryId: string) => {
            const pathToCategory = `categories/${categoryId}`
            this.fsService.getDoc(pathToCategory).subscribe((category: Category) => {

                this.dialog.open(AddProductComponent, {
                    data: {
                        category
                    }
                })
            })
        })
        // this.dialog.open(AddProductComponent)
    }
    getProducts() {
        const pathToProducts = `categories/${this.categoryId}/products`;
        this.products$ = this.fsService.collection(pathToProducts);
    }
    onProductDetails(productId) {
        this.dialog.open(ProductDetailsComponent, {
            data: {
                categoryId: this.categoryId,
                productId
            }
        })
    }
}
