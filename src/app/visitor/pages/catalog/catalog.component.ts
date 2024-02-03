import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize.pipe';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import * as fromRoot from './../../../app.reducer';
import * as VISITOR from '../../visitor-store/visitor.actions'
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-catalog',
    standalone: true,
    imports: [CommonModule, CapitalizePipe, MatProgressSpinnerModule],
    templateUrl: './catalog.component.html',
    styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit {

    categories$: Observable<any>;
    isLoading: boolean = true;

    constructor(
        private fsService: FirestoreService,
        private store: Store<fromRoot.SuringarState>,
        private router: Router) { }

    ngOnInit(): void {
        const pathToCategories = `categories`
        this.categories$ = this.fsService.collection(pathToCategories).pipe(tap(() => {
            this.isLoading = false
        }));
    }
    onCategory(categoryId: string) {
        this.store.dispatch(new VISITOR.SetCategoryId(categoryId));
        this.router.navigateByUrl('/visitor/products-visitor')
    }
}
