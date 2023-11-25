import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { MatButtonModule } from '@angular/material/button';
import * as ADMIN from './../store/admin.actions';
import * as fromRoot from './../../app.reducer';
import { Store } from '@ngrx/store'


@Component({
    selector: 'app-product-categories',
    standalone: true,
    imports: [CommonModule, ProductCategoryComponent, MatButtonModule],
    templateUrl: './product-categories.component.html',
    styleUrls: ['./product-categories.component.scss']
})



export class ProductsComponent {
    categories: string[] = ['amplifiers', 'german basses']

    constructor(
        private store: Store<fromRoot.State>
    ) {

    }

    onCategorySelected(category: string) {
        this.store.dispatch(new ADMIN.SetCategory(category))
    }
    onAddCategory() {

    }
}
