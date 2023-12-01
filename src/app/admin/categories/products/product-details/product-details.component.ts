import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, MatDialogModule],
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    product$: Observable<DocumentData>
    isLoggedIn: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private fsService: FirestoreService,
        private afAuth: Auth,
        private dialogRef: MatDialogRef<ProductDetailsComponent>

    ) { this.authStatusListener(); }

    ngOnInit(): void {
        this.dialogRef.updateSize('50rem', 'auto')
        console.log(this.data)
        const categoryId = this.data.categoryId;
        const productId = this.data.productId;
        const path = `categories/${categoryId}/products/${productId}`
        console.log(path)
        this.product$ = this.fsService.getDoc(path)
        this.fsService.getDoc(path).subscribe((product: any) => {
            console.log(product)
        })
    }
    authStatusListener() {
        this.afAuth.onAuthStateChanged((credential) => {
            if (credential) {
                console.log(credential);
                this.isLoggedIn = true
            }
        })
    }
}
