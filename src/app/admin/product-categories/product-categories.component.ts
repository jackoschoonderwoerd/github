import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';

@Component({
    selector: 'app-product-categories',
    standalone: true,
    imports: [CommonModule, ProductCategoryComponent],
    templateUrl: './product-categories.component.html',
    styleUrls: ['./product-categories.component.scss']
})



export class ProductsComponent {
    categories: string[] = ['amplifiers', 'german basses']

    onCategorySelected(category: string) {
        console.log(category)
    }
}
