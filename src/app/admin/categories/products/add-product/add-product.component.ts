import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DocumentReference } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { Category } from 'src/app/shared/models/category.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

    categoryId: string;
    category$: Observable<any>
    form: FormGroup;
    editmode: boolean = false;
    productId: string = null;

    constructor(
        private store: Store<fromRoot.State>,
        private fb: FormBuilder,
        private fsService: FirestoreService,
        private dialogRef: MatDialogRef<AddProductComponent>,

    ) { }

    ngOnInit(): void {
        this.initForm()
        this.store.select(fromRoot.getCategoryId).subscribe((categoryId: string) => {
            if (categoryId) {
                this.categoryId = categoryId
                const pathToCategory = `categories/${categoryId}`
                this.category$ = this.fsService.getDoc(pathToCategory)
                this.store.select(fromRoot.getProductId).subscribe((productId: string) => {
                    if (productId) {
                        this.productId = productId
                        const pathToProduct = `categories/${categoryId}/products/${productId}`;
                        this.fsService.getDoc(pathToProduct)
                            .subscribe((product: Product) => {
                                if (product) {
                                    this.editmode = true;
                                    this.patchForm(product)
                                }

                            })
                    }
                })
            }
        })
    }
    initForm() {
        this.form = this.fb.group({
            id: new FormControl(null),
            name: new FormControl('Victor Pawlovski', [Validators.required]),
            description: new FormControl(null),
            price: new FormControl(123, [Validators.required])
        })
    }
    patchForm(product: Product) {
        this.form.setValue({
            ...product
        })
    }
    onAddProduct() {
        const product: Product = {
            ...this.form.value
        }
        const pathToGategory = `categories/${this.categoryId}/products`
        if (this.editmode) {
            const pathToProduct = `categories/${this.categoryId}/products/${this.productId}`
            this.fsService.updateDocument(pathToProduct, product)
                .then((res: any) => {
                    console.log(`product updated; ${res}`)
                    this.dialogRef.close();
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to update product; ${err.message}`)
                    this.dialogRef.close();
                })
        } else {
            this.fsService.addDoc(pathToGategory, product)
                .then((docRef: DocumentReference) => {
                    console.log(`product added; ${docRef}`)
                    this.dialogRef.close();
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to add product; ${err.message}`)
                    this.dialogRef.close();
                })
        }


    }
    onCancel() {
        this.dialogRef.close();
    }

}
