import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-products-visitor',
    standalone: true,
    imports: [CommonModule, MatExpansionModule],
    templateUrl: './products-visitor.component.html',
    styleUrls: ['./products-visitor.component.scss']
})
export class ProductsVisitorComponent implements OnInit {

    products$: Observable<any>

    constructor(
        private route: ActivatedRoute,
        private fsService: FirestoreService,

    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params: any) => {
            console.log(params.categoryId);
            const categoryId = params.categoryId;
            const pathToProducts = `categories/${categoryId}/products`
            this.products$ = this.fsService.collection(pathToProducts)

        })
        const categoryId = this.route.snapshot.paramMap.get('categoryId');
        console.log(categoryId)
    }
}
