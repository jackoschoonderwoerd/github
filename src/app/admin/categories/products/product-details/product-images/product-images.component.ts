import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as fromRoot from '../../../../../app.reducer';
import * as ADMIN from '../../../../admin-store/admin.actions'
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { getDownloadURL } from '@firebase/storage';
import { FirestoreError } from '@angular/fire/firestore';
import { FirebaseError } from '@angular/fire/app';
import { Product } from 'src/app/shared/models/product.model';
import { take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-item-images',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, RouterModule],
    templateUrl: './product-images.component.html',
    styleUrl: './product-images.component.scss'
})
export class ProductImagesComponent implements OnInit {

    categoryId: string;
    productId: string;
    editmode: boolean = false;
    storingImage: boolean = false;

    constructor(
        private store: Store<fromRoot.SuringarState>,
        private storageService: StorageService,
        private fsService: FirestoreService,
        private dialog: MatDialog,
        private router: Router
    ) {

    }
    @Input() public imageUrls: string[]

    ngOnInit(): void {
        this.store.select(fromRoot.getAdminCategoryId).subscribe((categoryId: string) => {
            if (categoryId) {
                this.categoryId = categoryId;
                this.store.select(fromRoot.getAdminProductId).subscribe((productId: string) => {
                    if (productId) {
                        this.productId = productId
                        this.editmode = true;
                    }
                })
            }
        })
    }
    onDeleteImage(imageUrl: string, index: number) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                message: 'this will permanently delete the image'
            }
        })
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                this.deleteImageFromStorage(imageUrl)
                    .then((res: any) => {
                        console.log(`imageFile removed from storage, ${res}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to remove imageFile from storage, ${err.message}`)
                    })
                    .then(() => {
                        return this.deleteImageUrlFromImageUrlsArray(imageUrl)
                    })
                    .then((res: any) => {
                        console.log(`imageUrl removed from imageUrlsArray, ${res}`)
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to remove imageUrl from imageUrlsArray, ${err.message}`)
                    })
            }
        })
    }

    onMoveImage(direction: string, index1: number) {
        const pathToDoc = `categories/${this.categoryId}/products/${this.productId}`
        this.fsService.getDoc(pathToDoc).pipe(take(1)).subscribe((product: Product) => {
            const imageUrlsArray = product.imageUrls;
            let index2 = 0;
            if (direction === 'left') {
                index2 = index1 - 1;
            } else {
                index2 = index1 + 1
            }
            if (index1 >= 0 && index1 < product.imageUrls.length && index2 >= 0 && index2 < product.imageUrls.length) {
                let temp = product.imageUrls[index1];
                product.imageUrls[index1] = product.imageUrls[index2];
                product.imageUrls[index2] = temp;
                // this.updateLocalImageUrls(product.imageUrls)
                const path = `categories/${this.categoryId}/products/${this.productId}`
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
        // get the array

    }

    onImageInputChange(e) {
        // this.storingImage = true
        // const imageFile = e.target.files[0]
        // this.addImageToStorage(imageFile)
        //     .then((downloadUrl: string) => {
        //         console.log(downloadUrl)
        //         return downloadUrl
        //     })
        //     .catch((err: FirestoreError) => {
        //         console.log(`failed to store image file, ${err.message}`)
        //     })
        //     .then((downloadUrl: string) => {
        //         return this.addUrlToProductImagesArray(downloadUrl)
        //     })
        //     .then((res: any) => {
        //         console.log('imageUrlsArray updated')
        //     })
        //     .catch((err: FirebaseError) => {
        //         console.log(`failed to update imageUrlsArray, ${err.message}`)
        //     })
        //     .then(() => {
        //         this.storingImage = false;
        //     })
    }
    private addImageToStorage(imageFile: File) {
        const pathToImageStorage = `categories/${this.categoryId}/products/${this.productId}/images/${imageFile.name}`
        return this.storageService.storeObject(pathToImageStorage, imageFile)
    }
    private addUrlToProductImagesArray(downloadUrl: string) {
        const pathToProductImageUrlsArray = `categories/${this.categoryId}/products/${this.productId}`
        console.log(downloadUrl);
        return this.fsService.addElementToImageUrlsArray(pathToProductImageUrlsArray, downloadUrl)
    }
    private deleteImageFromStorage(imageUrl) {
        const filename = this.getFilenameFromDownloadUrl(imageUrl)
        const pathToImageStorageLocation = `categories/${this.categoryId}/products/${this.productId}/images/${filename}`
        return this.storageService.deleteObject(pathToImageStorageLocation)
        // const pathToImageFile = `categories/${this.categoryId}/products/${this.productId}/images/${imageFile.name}`
    }
    private deleteImageUrlFromImageUrlsArray(imageUrl: string) {
        const pathToDocument = `categories/${this.categoryId}/products/${this.productId}`
        return this.fsService.deleteStringFromArray(pathToDocument, imageUrl)
    }
    private getFilenameFromDownloadUrl(imageUrl: string) {
        const indexStart: number = imageUrl.indexOf('images%2F') + 9;
        const indexEnd: number = imageUrl.indexOf('?alt');
        const filename: string = imageUrl.substring(indexEnd, indexStart);
        console.log(filename)
        return filename
    }

    onImageControl() {
        console.log('onImageControl()')
        this.router.navigateByUrl('image-control')
    }

}

