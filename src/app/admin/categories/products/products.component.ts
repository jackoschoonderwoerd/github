import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'

import { Observable, tap } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { FirebaseError } from '@angular/fire/app';
import * as ADMIN from 'src/app/admin/admin-store/admin.actions'




import { StorageService } from 'src/app/shared/services/storage.service';
import { StorageError } from '@angular/fire/storage';
import { Auth, User as FirebaseUser, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { WarnComponent } from 'src/app/shared/warn/warn.component';


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
    isLoggedIn: boolean = false;
    isLoading: boolean = false;

    constructor(
        private store: Store<fromRoot.SuringarState>,
        private dialog: MatDialog,
        private fsService: FirestoreService,
        private storageService: StorageService,
        private afAuth: Auth,
        private router: Router

    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.isLoggedIn = true;
                this.user$ = new Observable<FirebaseUser>((subcriber: any) => {
                    subcriber.next(user)
                })
            }
        })


        this.store.select(fromRoot.getAdminCategoryId).subscribe((categoryId: any) => {
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
                    this.products$ = this.fsService.collection(pathToProducts).pipe(tap(() => {
                        this.isLoading = false
                    }))
                    // this.fsService.collection(pathToProducts).subscribe((products: Product[]) => {
                    //     console.log(products)
                    // })
                }
            }
        })
    }

    onEdit(product) {
        // this.store.dispatch(new ADMIN.SetProductId(productId))
        this.router.navigateByUrl('product-details')
        this.store.dispatch(new ADMIN.SetProductId(product.id))
        // this.dialog.open(AddProductComponent, {
        //     data: {
        //         product,
        //         category: this.category
        //     }
        // })
    }
    onDelete(product: Product) {

        const dialogRef = this.dialog.open(ConfirmComponent, {

            data: {
                message: 'This will permanently delete the product and all of it\'s properties'
            },
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            this.storedImages(this.categoryId, product.id)
                .then((storedImagesFound: boolean) => {
                    this.dialog.open(WarnComponent, {
                        data: {
                            message: 'you have to delete the images for this item before you can delete the item'
                        }
                    })
                    console.log(`storedImagesFound: ${storedImagesFound}`)
                    return;
                })
                .catch((storedImagesFound: boolean) => {
                    console.log(`storedImagesFound: ${storedImagesFound}`)
                    this.removeItemFromDb(this.categoryId, product.id)
                })
                .then((res: any) => {
                    console.log(`item removed, ${res}`)
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to remove item, ${err.message}`)
                })

        })

    }

    storedImages(categoryId, productId) {
        const pathToImageFiles = `categories/${this.categoryId}/products/${productId}/images`;
        const promise = new Promise((resolve, reject) => {
            this.storageService.listAll(pathToImageFiles).then((list: any) => {
                if (list.items.length) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })

        })
        return promise
    }
    removeItemFromDb(categoryId, productId) {
        console.log('removeItemFromDb()')
        const pathToItemDb = `categories/${categoryId}/products/${productId}`;
        return this.fsService.deleteDoc(pathToItemDb)
    }


    onAddProduct(categoryId: string) {
        this.store.dispatch(new ADMIN.SetCategoryId(categoryId))
        this.router.navigate(['product-details'])
        return
    }
    getProducts() {
        const pathToProducts = `categories/${this.categoryId}/products`;
        this.products$ = this.fsService.collection(pathToProducts);
    }

}
