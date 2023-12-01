import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Bass } from 'src/app/shared/models/bass.model';
import { ImageComponent } from '../shared/image/image.component';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DocumentReference, FirestoreError } from '@angular/fire/firestore';
import * as ADMIN from 'src/app/admin/store/admin.actions'
import { Category } from 'src/app/shared/models/category.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Product } from 'src/app/shared/models/product.model';
import { StorageError } from '@angular/fire/storage';
import { FirebaseError } from '@angular/fire/app';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Component({
    selector: 'app-add-bass',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ImageComponent
    ],
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

    form: FormGroup;
    editmode: boolean = false;
    imageUrl: string;
    category: Category;
    imageUpdated: boolean = false;
    imageFile: File;
    imageFiles: File[] = [];
    product: Product;
    imageUrls: string[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<AddProductComponent>,
        private fb: FormBuilder,
        private store: Store<fromRoot.State>,
        private fsService: FirestoreService,
        private storageService: StorageService,
        private dialog: MatDialog
    ) { }


    ngOnInit(): void {
        console.log(this.data);
        console.log(this.data.category);
        this.initForm()
        this.dialogRef.updateSize(
            '100%', '100%'
        )
        if (this.data.category) {
            this.category = this.data.category;
        }
        if (this.data.product) {
            this.product = this.data.product
            this.imageUrl = this.data.product.imageUrl;
            this.editmode = true;
            this.category = this.data.category;
            this.setForm(this.data.product)
        }
    }

    initForm() {
        this.form = this.fb.group({
            // general
            id: new FormControl(null),
            name: new FormControl(null, [Validators.required]),
            description: new FormControl(null),
            color: new FormControl(null),
            imageUrl: new FormControl(null),
            material: new FormControl(null),
            weight: new FormControl(null),
            price: new FormControl(null, [Validators.required]),
            // bass
            scale: new FormControl(null),
            typeOfWood: new FormControl(null),
            origin: new FormControl(null),
            yearBuilt: new FormControl(null),
            backboard: new FormControl(null),
            bridge: new FormControl(null),
            mensuur: new FormControl(null),
            stringLength: new FormControl(null),
            top: new FormControl(null),
            middle: new FormControl(null),
            bottom: new FormControl(null),
            depth: new FormControl(null),
            lengthBackPlate: new FormControl(null),
            // amp
            type: new FormControl(null),
            output: new FormControl(null),
        })
    }
    setForm(product) {
        this.form.setValue({
            ...product
        })
    }
    // onImageInputChange(e) {
    //     this.imageUpdated = true;
    //     this.imageFile = e.target.files[0]
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         this.imageUrl = reader.result as string;
    //     }
    //     reader.readAsDataURL(this.imageFile)
    // }

    onImageInputChange(e) {
        this.imageUrls = [];
        this.imageUpdated = true;
        this.imageFile = e.target.files[0]
        this.imageFiles.push(e.target.files[0])
        this.imageFiles.forEach((imageFile: File) => {
            const reader = new FileReader();
            reader.onload = () => {
                let url = reader.result as string
                console.log(url)
                this.imageUrls.push(url)
            }
            reader.readAsDataURL(imageFile);
            console.log(this.imageFiles)
            console.log(this.imageUrls)
        })
    }
    onDeleteImageFromImageUrls(i) {
        console.log(i)
        this.imageUrls.splice(i, 1)
    }

    onDeleteImage() {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                message: 'this will premanently delete the image'
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            console.log(res);
            if (res) {
                const pathToImageFile = `categories/${this.category.id}/products/${this.product.id}`
                this.storageService.deleteObject(pathToImageFile)
                    .then((res: any) => {
                        console.log(`file deleted from storage ${res}`)
                        const pathToProduct = `categories/${this.category.id}/products/${this.product.id}`
                        this.fsService.updateDocument(pathToProduct, { imageUrl: null })
                            .then((res: any) => {
                                console.log(`imageUrl updated; ${res}`)
                                this.imageUrl = null;
                            })
                            .catch((err: FirebaseError) => {
                                console.log(`failed to update imageUrl; ${err.message}`)
                            })
                    })
                    .catch((err: StorageError) => {
                        console.log(`failed to delete file from storage; ${err.message}`)
                    })
            }
        })
    }

    onAddProduct() {
        if (!this.editmode) {
            console.log(this.form.value)
            const product: Product = {
                ...this.form.value,
                imageUrl: null
            }
            console.log(product);
            this.store.select(fromRoot.getCategoryId).subscribe((categoryId: string) => {
                const pathToFrenchBasses = `categories/${categoryId}/products`
                this.fsService.addDoc(pathToFrenchBasses, product)
                    .then((docRef: DocumentReference) => {
                        this.store.dispatch(new ADMIN.SetProductId(docRef.id))
                        console.log(`product added; ${docRef.id}`)
                        if (this.imageUpdated) {
                            const pathToImageFile = `categories/${categoryId}/products/${docRef.id}`
                            this.storageService.storeObject(pathToImageFile, this.imageFile)
                                .then((downloadUrl: string) => {
                                    console.log(`image file stored`)
                                    const pathToProduct = `categories/${categoryId}/products/${docRef.id}`;
                                    this.fsService.updateDocument(pathToProduct, { imageUrl: downloadUrl });
                                    this.dialogRef.close();
                                })
                                .catch((err: StorageError) => {
                                    console.log(`failed to store image file; ${err.message}`)
                                    this.dialogRef.close();
                                })
                        } else {
                            console.log('no image to store');
                            this.dialogRef.close();
                        }
                    })
                    .catch((err: FirestoreError) => {
                        console.log(`failed to add product; ${err.message}`)
                        this.dialogRef.close();
                    })
            })
        } else {
            console.log(this.form.value);
            const product: Product = {
                ...this.form.value,
                imageUrl: this.imageUrl
            }
            console.log(product)
            if (product.imageUrl) {
                const pathToImageFile = `categories/${this.category.id}/products/${this.product.id}`
                console.log(pathToImageFile);
                this.storageService.storeObject(pathToImageFile, this.imageFile)
                    .then((downloadUrl: string) => {
                        console.log(`image file stored; ${downloadUrl}`)
                    })
                    .catch((err: StorageError) => {
                        console.log(`failed to store image file; ${err.message}`)
                    })
                    .then(() => {
                        const pathToProduct = `categories/${this.category.id}/products/${this.product.id}`;
                        return this.fsService.setDoc(pathToProduct, product)

                    })
                    .then((res: any) => {
                        console.log(`product updated; ${res}`)
                        this.dialogRef.close();
                    })
                    .catch((err: FirestoreError) => {
                        console.log(`failed to update product; ${err.message}`)
                        this.dialogRef.close();
                    })
            } else {
                const pathToProduct = `categories/${this.category.id}/products/${this.product.id}`;
                return this.fsService.setDoc(pathToProduct, product)
                    .then((res: any) => {
                        console.log(`product updated; ${res}`)
                        this.dialogRef.close();
                    })
                    .catch((err: FirestoreError) => {
                        console.log(`failed to update product; ${err.message}`)
                        this.dialogRef.close();
                    })
            }

        }
    }

    onCancel() {
        this.dialogRef.close();
    }
}
