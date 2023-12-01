import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { FirebaseError } from '@angular/fire/app';
import { StorageError } from '@angular/fire/storage';

@Component({
    selector: 'app-image',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {


    imageUrl: string;
    file: File;

    constructor(
        private store: Store<fromRoot.State>,
        private storageService: StorageService,
        private fsService: FirestoreService

    ) { }

    ngOnInit(): void {
        this.store.select(fromRoot.getProductId).subscribe((productId: string) => {
            if (productId) {
                this.store.select(fromRoot.getCategoryId).subscribe((categoryId: string) => {
                    this.storeFile(categoryId, productId)
                })
            }
        })
    }

    onImageInputChange(e) {
        console.log(e.target.files[0])
        this.file = e.target.files[0]
        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result as string;
        }
        reader.readAsDataURL(this.file)
    }

    storeFile(categoryId: string, productId: string) {
        console.log(`storeFile(); ${this.file} ${categoryId}, ${productId}`)
        const pathToImageFile = `categories/${categoryId}/products/${productId}`
        if (categoryId && productId && this.file) {
            this.storageService.storeObject(pathToImageFile, this.file)
                .then((downloadUrl: string) => {
                    const pathToProduct = `categories/${categoryId}/products/${productId}`

                    this.fsService.updateDocument(pathToProduct, { imageUrl: downloadUrl })
                        .then((res: any) => {
                            console.log(`imageUrl updated; ${res}`)
                        })
                        .catch((err: FirebaseError) => {
                            console.log(`failed to updeat imageUrl; ${err.message}`)
                        })
                })
                .catch((err: StorageError) => {
                    console.log(`failed to store image file; ${err.message}`)
                })
        }
    }
}
