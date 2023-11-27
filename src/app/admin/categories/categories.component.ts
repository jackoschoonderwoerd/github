import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import * as ADMIN from '../store/admin.actions';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store'
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseError } from '@angular/fire/app';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { CategoryComponent } from './category/category.component';


@Component({
    selector: 'app-product-categories',
    standalone: true,
    imports: [
        CommonModule,
        CategoryComponent,
        MatButtonModule,
        MatDialogModule,
        MatIconModule
    ],
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})



export class CategoriesComponent implements OnInit {
    categories: string[] = ['amplifiers', 'german basses']

    categories$: Observable<DocumentData>

    constructor(
        private store: Store<fromRoot.State>,
        private fsService: FirestoreService,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        const path = `categories`
        this.categories$ = this.fsService.collection(path);
    }

    onCategorySelected(category: string) {
        this.store.dispatch(new ADMIN.SetCategory(category))
    }
    onAddCategory() {
        this.dialog.open(AddCategoryComponent)
        // const path = 'categries'
        // const document = {
        //     name: 'german basses'
        // }
        // this.fsService.addDoc(path, document)
        //     .then((docRef: DocumentReference) => {

        //     })
    }
    onEdit(id: string) {
        this.dialog.open(AddCategoryComponent, {
            data: {
                id
            }
        })
        console.log(id)
    }
    onDelete(id: string) {
        console.log(id)
        const dialogRef = this.dialog.open(ConfirmComponent, {
            data: {
                message: 'this will permanently delete the category'
            }
        })
        dialogRef.afterClosed().subscribe((status: boolean) => {
            if (status) {
                const path = `categories/${id}`
                this.fsService.deleteDoc(path)
                    .then((res: any) => {
                        console.log('category deleted')
                    })
                    .catch((err: FirebaseError) => {
                        console.log(`failed to delete categorie; ${err.message}`)
                    })
            }
        })
    }
}
