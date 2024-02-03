import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import * as ADMIN from '../admin-store/admin.actions';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store'
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { Observable, tap } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseError } from '@angular/fire/app';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { ProductsComponent } from './products/products.component';
import { Auth, onAuthStateChanged, User as FirebaseUser } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'



@Component({
    selector: 'app-categories',
    standalone: true,
    imports: [
        CommonModule,
        ProductsComponent,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        CapitalizePipe,
        MatProgressSpinnerModule
    ],
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})



export class CategoriesComponent implements OnInit {
    categories: string[] = ['amplifiers', 'german basses'];
    title: string = 'CategoriesComponent';
    isLoggedIn: boolean = false;
    isLoading: boolean = true;

    categories$: Observable<DocumentData>

    constructor(
        private store: Store<fromRoot.SuringarState>,
        private fsService: FirestoreService,
        private dialog: MatDialog,
        private afAuth: Auth,
        private router: Router
    ) { }

    ngOnInit(): void {

        onAuthStateChanged(this.afAuth, (user: FirebaseUser) => {
            if (user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        })

        const path = `categories`
        this.categories$ = this.fsService.collection(path).pipe(tap(() => {
            this.isLoading = false;
        }))
    }

    onCategorySelected(categoryId: string) {
        console.log(categoryId)

        this.store.dispatch(new ADMIN.SetCategoryId(categoryId))

    }
    onAddCategory() {
        this.dialog.open(AddCategoryComponent)
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
