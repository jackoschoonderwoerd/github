import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddProductComponent } from './add-product/add-product.component';
import { Observable, take } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Category } from 'src/app/shared/models/category.model';
import { Product } from 'src/app/shared/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { FirebaseError } from '@angular/fire/app';
import * as ADMIN from 'src/app/admin/store/admin.actions'
import { AddBassComponent } from './add-bass/add-bass.component';
import { AddBowComponent } from './add-bow/add-bow.component';

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
    products$: Observable<DocumentData>

    constructor(
        private store: Store<fromRoot.State>,
        private dialog: MatDialog,
        private fsService: FirestoreService

    ) { }

    ngOnInit(): void {
        this.store.select(fromRoot.getCategoryId).subscribe((categoryId: any) => {
            if (categoryId) {
                this.categoryId = categoryId
                if (categoryId) {

                    const pathToCategory = `categories/${categoryId}`
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
    onEdit(productId) {
        this.store.dispatch(new ADMIN.SetProductId(productId))
        this.dialog.open(AddProductComponent)
    }
    onDelete(productId: string) {
        console.log(productId)
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                message: 'This will permanently delete the product and all of it\'s properties'
            }
        })
        dialogRef.afterClosed().subscribe((status: boolean) => {
            if (status) {
                const pathToProduct = `categories/${this.categoryId}/products/${productId}`
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
                console.log(category);
                const name = category.name
                switch (name) {
                    case 'french basses': {
                        console.log('say hi')
                        this.dialog.open(AddBassComponent, {
                            data: {
                                category: 'french basses'
                            }
                        })
                        break;
                    }
                    case 'bows': {
                        console.log('say ho')
                        this.dialog.open(AddBowComponent)
                        break;
                    }
                }
            })
        })
        // this.dialog.open(AddProductComponent)
    }
    getProducts() {
        const pathToProducts = `categories/${this.categoryId}/products`;
        this.products$ = this.fsService.collection(pathToProducts);
    }
}
