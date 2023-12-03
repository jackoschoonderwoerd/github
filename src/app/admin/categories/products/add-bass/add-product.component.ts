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
import { DocumentReference, FirestoreError, updateDoc } from '@angular/fire/firestore';
import * as ADMIN from 'src/app/admin/store/admin.actions'
import { Category } from 'src/app/shared/models/category.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Product } from 'src/app/shared/models/product.model';
import { StorageError } from '@angular/fire/storage';
import { FirebaseError } from '@angular/fire/app';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { Observable, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageBlowupComponent } from './images/image-blowup/image-blowup.component';

@Component({
    selector: 'app-add-bass',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ImageComponent,
        MatIconModule,
        MatProgressSpinnerModule
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
    product$: Observable<any>
    imageUrls: string[] = [];
    isStoringImage: boolean = false


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
            const pathToProduct = `categories/${this.category.id}/products/${this.data.product.id}`
            this.product$ = this.fsService.getDoc(pathToProduct)
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
            imageUrls: new FormControl(null),
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

    onImageInputChange(e) {
        this.isStoringImage = true
        this.imageUrls = [];
        this.imageUpdated = true;
        this.imageFile = e.target.files[0]
        // this.imageFiles.push(e.target.files[0])
        this.addImageStorage(e.target.files[0])
            .then((downloadUrl: string) => {
                console.log(`image stored at :${downloadUrl}`)
                return downloadUrl
            })
            .catch((err: StorageError) => {
                console.log(`failed to store image; ${err.message}`)
            })
            .then((downloadUrl: string) => {
                console.log(downloadUrl);
                return this.addUrlToProductImagesArray(downloadUrl)
            })
            .then((res: any) => {
                console.log(`imagesUrlArray updated, ${res}`)
                this.isStoringImage = false;
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update imagerUrlArray; ${err.message}`)
                this.isStoringImage = false;
            })
    }

    onImage(imageUrl) {
        this.dialog.open(ImageBlowupComponent, {
            data: {
                imageUrl
            }
        })
    }

    private addImageStorage(image: File) {
        console.log(image.name)
        const pathToImageStorage = `categories/${this.category.id}/products/${this.product.id}/images/${image.name}`
        return this.storageService.storeObject(pathToImageStorage, image)

    }

    private addUrlToProductImagesArray(imageUrl: string) {
        const pathToProductImageUrlsArray = `categories/${this.category.id}/products/${this.product.id}`
        console.log(imageUrl);
        return this.fsService.addElementToArray(pathToProductImageUrlsArray, imageUrl)

    }
    onDeleteImage(imageUrl: string, i: number) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                message: 'This will permanently delete the selected image'
            }
        });
        dialogRef.afterClosed().subscribe((status: boolean) => {
            if (status) {
                console.log(imageUrl, i)
                this.product$.pipe(take(1)).subscribe((product: Product) => {
                    const src: string = product.imageUrls[i];
                    const indexStart: number = src.indexOf('images%2F') + 9;
                    const indexEnd: number = src.indexOf('?alt');
                    const filename: string = src.substring(indexEnd, indexStart);
                    const pathToFile: string = `categories/${this.category.id}/products/${this.product.id}/images/${filename}`
                    this.storageService.deleteObject(pathToFile)
                        .then((res: any) => {
                            console.log(`file deleted; ${res}`)
                        })
                        .catch((err: StorageError) => {
                            console.log(`failed to delete file; ${err.message}`);
                            return
                        })
                        .then(() => {
                            const pathToProduct: string = `categories/${this.category.id}/products/${product.id}`;
                            this.fsService.deleteStringFromArray(pathToProduct, src)
                        })
                        .then((res: any) => {
                            console.log(`imageUrl removed from array; ${res}`)
                        })
                        .catch((err: FirebaseError) => {
                            console.log(`failed to remove imageUrl from arra; ${err.message}`)
                        })
                })
            }
        })
    }

    onMoveImage(direction: string, index1: number) {
        let index2 = 0;
        if (direction == 'left') {
            index2 = index1 - 1;
        } else {
            index2 = index1 + 1;
        }
        this.product$.pipe(take(1)).subscribe((product: Product) => {
            if (index1 >= 0 && index1 < product.imageUrls.length && index2 >= 0 && index2 < product.imageUrls.length) {
                let temp = product.imageUrls[index1];
                product.imageUrls[index1] = product.imageUrls[index2];
                product.imageUrls[index2] = temp;
                const path = `categories/${this.category.id}/products/${this.product.id}`
                this.fsService.updateDocument(path, { imageUrls: product.imageUrls })
                    .then((res: any) => {
                        console.log(`array updated; ${res}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to update array; ${err.message}`)
                    });
            } else {
                console.log("Invalid indexes provided.");
            }
        })
    }


    onAddProduct() {
        const product: Product = {
            ...this.form.value
        }
        if (!this.editmode) {
            const pathToProducts = `categories/${this.category.id}/products`;
            this.fsService.addDoc(pathToProducts, product)
                .then((docRef: DocumentReference) => {
                    this.editmode = true;
                    product.id = docRef.id;
                    this.product = product;
                    const pathToProduct = `categories/${this.category.id}/products/${product.id}`
                    this.product$ = this.fsService.getDoc(pathToProduct)
                })
                .catch((err: FirebaseError) => {
                    console.log(`failed to add product; ${err.message}`)
                })
        } else {
            console.log('update')
        }
    }
    onUpdateProduct() {
        const product: Product = {
            ...this.form.value,
            imageUrls: this.product.imageUrls
        }
        console.log(product)
        const pathToProduct = `categories/${this.category.id}/products/${product.id}`
        this.fsService.setDoc(pathToProduct, product)
            .then((res: any) => {
                console.group(res)
            })
            .catch((err: FirebaseError) => {
                console.log(err.message)
            })
    }


    onCancel() {
        this.dialogRef.close();
    }
}
