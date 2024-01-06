import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ProductsVisitorService } from '../products-visitor.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { ProductIds } from 'src/app/shared/models/product-ids';


@Component({
    selector: 'app-product-visitor',
    standalone: true,
    imports: [CommonModule, ImageSliderComponent],
    templateUrl: './product-visitor.component.html',
    styleUrls: ['./product-visitor.component.scss']
})
export class ProductVisitorComponent implements OnInit {



    constructor(
        private route: ActivatedRoute,
        private fsService: FirestoreService,
        private productsVisitorService: ProductsVisitorService,
        private uiService: UiService) { }

    product$: Observable<any>

    ngOnInit(): void {
        this.uiService.productIdsChanged.subscribe((productIds: ProductIds) => {
            console.log(productIds)
        })
        this.route.params.subscribe((params: any) => {
            console.log(params)
            const categoryId = params.categoryId;
            const productId = params.productId;
            const pathToProduct = `categories/${categoryId}/products/${productId}`
            this.product$ = this.fsService.getDoc(pathToProduct)
            this.fsService.getDoc(pathToProduct).subscribe((product: Product) => {
                this.productsVisitorService.imageUrlsChanged.emit(product.imageUrls)
            })
            const productIds: ProductIds = {
                categoryId, productId
            }
            this.uiService.productIdsChanged.next(productIds)
        })
    }
}
