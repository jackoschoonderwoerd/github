//https://sandroroth.com/blog/angular-complex-reactive-forms/

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemFormService } from './item-form.service';
import { GeneralComponent } from './general/general.component';
import { BassComponent } from './bass/bass.component';
import { AmplifierComponent } from './amplifier/amplifier.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Product } from 'src/app/shared/models/product.model';
import { FirebaseError } from '@angular/fire/app';
import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/app.reducer';
import { ProductImagesComponent } from './product-images/product-images.component';
import * as ADMIN from 'src/app/admin/admin-store/admin.actions';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GeneralComponent,
        BassComponent,
        AmplifierComponent,
        FormsModule,
        MatButtonModule,
        ProductImagesComponent,
        RouterModule
    ],
    providers: [ItemFormService],
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    readonly form = inject(ItemFormService).form;
    category: Category;
    categoryId: string;
    category$: Observable<any>
    productId: string;
    product$: Observable<any>
    imageUrls: string[] = [];
    editmode: boolean = false;
    isLoading: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private fsService: FirestoreService,
        private router: Router,
        private store: Store<fromRoot.SuringarState>
    ) { }

    ngOnInit(): void {
        this.store.select(fromRoot.getAdminCategoryId).subscribe((categoryId: string) => {
            if (categoryId) {
                this.categoryId = categoryId;
                const pathToCategory = `categories/${categoryId}`
                this.category$ = this.fsService.getDoc(pathToCategory)
                this.store.select(fromRoot.getAdminProductId).subscribe((productId: string) => {
                    if (productId) {
                        console.log(productId)
                        this.editmode = true;
                        const pathToProduct = `categories/${categoryId}/products/${productId}`
                        this.product$ = this.fsService.getDoc(pathToProduct)
                        this.fsService.getDoc(pathToProduct).subscribe((product: Product) => {
                            if (product) {
                                this.productId = product.id;

                                this.setForm(product)
                                this.imageUrls = product.imageUrls
                            }
                        })
                    }
                })
            }
        })
    }

    private setForm(product) {
        this.form.setValue(product)
    }



    onSubmit(e) {
        const product: Product = { ...this.form.value }
        console.log(product);
        if (!this.editmode) {
            this.addProduct(product)
                .then((res: any) => {
                    console.log(`product added, ${res}`)
                    this.router.navigateByUrl('products')
                    this.resetStore()
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to add product, ${err.message}`)
                    this.resetStore()
                })
        } else {
            this.updateProduct(product)
                .then((res: any) => {
                    console.log(`product updated, ${res}`)
                    this.router.navigateByUrl('products')
                    this.resetStore()
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to update product, ${err.message}`)
                    this.resetStore()
                })
        }

    }
    onCancel() {
        this.router.navigateByUrl('products')
        this.store.dispatch(new ADMIN.SetProductId(null))
    }

    private addProduct(product) {
        const pathToProducts = `categories/${this.categoryId}/products`
        return this.fsService.addDoc(pathToProducts, product)


    }
    private updateProduct(product) {
        const pathToProduct = `categories/${this.categoryId}/products/${this.productId}`
        return this.fsService.updateDocument(pathToProduct, product)
    }
    private resetStore() {
        // this.store.dispatch(new ADMIN.SetCategoryId(null))
        this.store.dispatch(new ADMIN.SetProductId(null))
        this.router.navigateByUrl('products')
    }
}
