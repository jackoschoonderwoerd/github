import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { AddProductComponent } from './add-product/add-product.component';
import { Observable } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Category } from 'src/app/shared/models/category.model';

@Component({
    selector: 'app-category',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    category: Category;
    category$: Observable<DocumentData>;
    products$: Observable<DocumentData>

    constructor(
        private store: Store<fromRoot.State>,
        private dialog: MatDialog,
        private fsService: FirestoreService

    ) { }

    ngOnInit(): void {
        this.store.select(fromRoot.getCategory).subscribe((category: any) => {
            if (category) {
                this.category = category
                if (category.id) {
                    const pathToCategory = `categories/${category.id}`
                    this.category$ = this.fsService.getDoc(pathToCategory)
                    this.getProducts()
                }
            }
        })
    }
    onAddProduct() {
        this.dialog.open(AddProductComponent)
    }
    getProducts() {
        const pathToProducts = `categories/${this.category.id}/products`;
        this.products$ = this.fsService.collection(pathToProducts);
    }
}
