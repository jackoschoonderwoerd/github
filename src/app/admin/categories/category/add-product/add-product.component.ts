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

    category: Category;
    category$: Observable<any>
    form: FormGroup;

    constructor(
        private store: Store<fromRoot.State>,
        private fb: FormBuilder,
        private fsService: FirestoreService,
        private dialogRef: MatDialogRef<AddProductComponent>,

    ) { }

    ngOnInit(): void {
        this.initForm()
        this.store.select(fromRoot.getCategory).subscribe((category: any) => {
            if (category) {
                this.category = category
                const pathToCategory = `categories/${category.id}`
                this.category$ = this.fsService.getDoc(pathToCategory)
            }
        })
    }
    initForm() {
        this.form = this.fb.group({

            name: new FormControl('Victor Pawlovski', [Validators.required]),
            description: new FormControl(null),
            price: new FormControl(123, [Validators.required])
        })
    }
    onAddProduct() {
        const product: Product = {
            ...this.form.value
        }
        const pathToGategory = `categories/${this.category.id}/products`
        this.fsService.addDoc(pathToGategory, product)
            .then((docRef: DocumentReference) => {
                console.log(`product added; ${docRef}`)
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to add product; ${err.message}`)
            })


    }
    onCancel() {
        this.dialogRef.close()
    }

}
