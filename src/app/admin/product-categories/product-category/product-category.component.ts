import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromRoot from 'src/app/app.reducer'
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-product-category',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './product-category.component.html',
    styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

    category: string;

    constructor(
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit(): void {
        this.store.select(fromRoot.getCategory).subscribe((category: string) => {
            this.category = category
        })
    }
    onAddProduct() {

    }
}
