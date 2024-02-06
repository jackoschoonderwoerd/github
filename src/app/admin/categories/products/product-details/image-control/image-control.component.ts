import { Component, EventEmitter, Input, Output, computed, effect, inject, signal, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CropperDialogComponent } from './cropper-dialog/cropper-dialog.component';
import { Observable, filter, pipe, take } from 'rxjs';
import { getDownloadURL, ref, uploadBytes, Storage } from '@angular/fire/storage';
import { Store } from '@ngrx/store';
import * as fromRoot from './../../../../../app.reducer'
import { StorageService } from 'src/app/shared/services/storage.service';
import { FirestoreService } from '../../../../../shared/services/firestore.service';
import { FirebaseError } from '@angular/fire/app';
import { Router, RouterModule } from '@angular/router';
import { Category } from 'src/app/shared/models/category.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image-control',
    standalone: true,
    imports: [MatButtonModule, CommonModule],
    templateUrl: './image-control.component.html',
    styleUrl: './image-control.component.scss'
})
export class ImageControlComponent implements OnInit {

    product$: Observable<any>

    ngOnInit(): void {
        this.store.select(fromRoot.getAdminCategoryId).pipe(take(1)).subscribe((categoryId: string) => {
            if (categoryId) {
                this.store.select(fromRoot.getAdminProductId).subscribe((productId: string) => {
                    if (productId) {
                        const pathToProduct = `categories/${categoryId}/products/${productId}`
                        this.product$ = this.fsService.getDoc(pathToProduct)
                    }
                })
            }
        })
    }

    imageWidth = signal(0);
    @Input() set width(val: number) {
        this.imageWidth.set(val)
    };

    imageHeight = signal(0);
    @Input() set height(val: number) {
        this.imageHeight.set(val);
    };

    imagePath = signal('')
    @Input({ required: true }) set path(val: string) {
        this.imagePath.set(val)
    }

    filename: string;

    placeholder = computed(() => `https://placehold.co/${this.imageWidth()}x${this.imageHeight()}`);

    croppedImageUrl = signal<string | undefined>(undefined);

    imageSource = computed(() => this.croppedImageUrl() ?? this.placeholder());

    dialog = inject(MatDialog)

    store = inject(Store<fromRoot.SuringarState>)

    fsService = inject(FirestoreService)

    landscape

    fileSelected(event: any) {
        let width: number = 0;
        let height: number = 0;
        this.store.select(fromRoot.getAdminCategoryId).subscribe((categoryId: string) => {
            if (categoryId) {
                const pathToCategory = `categories/${categoryId}`;
                this.fsService.getDoc(pathToCategory).pipe(take(1)).subscribe((category: Category) => {

                    if (category.orientation == 'landscape') {
                        width = 600;
                        height = 400;
                    } else if (category.orientation == 'portrait') {
                        width = 400;
                        height = 600
                    } else if (category.orientation == 'stretched-portrait') {
                        width = 400;
                        height = 800;
                    } else if (category.orientation == 'extra-stretched-portrait') {
                        width = 400;
                        height = 1000;
                    } else {
                        width = 400;
                        height = 400;
                    }
                    const file = event.target.files[0];
                    if (file) {
                        this.filename = file.name;
                        const dialogRef = this.dialog.open(CropperDialogComponent, {
                            data: {
                                image: file,
                                width: width,
                                height: height
                            },
                            width: '500px'
                        })
                        dialogRef
                            .afterClosed()
                            .pipe(filter(result => !!result))
                            .subscribe((result) => {
                                this.uploadImage(result.blob);
                            });
                    }
                })
            }
        })
    }
    @Output() imageReady = new EventEmitter<string>();

    constructor(
        private router: Router,

    ) {
        effect(() => {
            if (this.croppedImageUrl()) {
                this.imageReady.emit(this.croppedImageUrl())
            }
        })
    }

    onCancel() {
        this.router.navigateByUrl('product-details')
    }

    storage = inject(Storage)

    // store = inject(Store<fromRoot.SuringarState>);

    storageService = inject(StorageService);

    firestoreService = inject(FirestoreService)

    async uploadImage(blob: Blob) {
        this.store.select(fromRoot.getAdminCategoryId).pipe(take(1)).subscribe((categoryId: string) => {
            if (categoryId) {
                this.store.select(fromRoot.getAdminProductId).pipe(take(1)).subscribe((productId: string) => {
                    if (productId) {
                        const pathToProduct = `categories/${categoryId}/products/${productId}/images/${this.filename}`;
                        this.storageService.storeBlob(pathToProduct, blob).then((downLoadUrl: string) => {
                            console.log(downLoadUrl)
                            this.updateFirestoreImageUrlsArray(`categories/${categoryId}/products/${productId}`, downLoadUrl);
                        })
                    }
                })
            }
        })
        // this.imagePath.set(`/my-images/${this.filename}`)
        // const storageRef = ref(this.storage, this.imagePath());
        // const uploadTask = await uploadBytes(storageRef, blob);
        // const downloadUrl = await getDownloadURL(uploadTask.ref);
        // this.croppedImageUrl.set(downloadUrl)
    }



    updateFirestoreImageUrlsArray(path: string, downloadUrl: string) {
        this.firestoreService.addElementToImageUrlsArray(path, downloadUrl)
            .then((res) => {
                console.log(`imageUrlArray updated: ${res}`);
            })
            .catch((err: FirebaseError) => {
                console.log(`failed to update imageUrlArray; ${err.message}`);
            })
        this.router.navigateByUrl('product-details')
    }
}
