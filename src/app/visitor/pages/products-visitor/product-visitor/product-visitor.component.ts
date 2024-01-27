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
import * as fromRoot from './../../../../app.reducer'
import { Store } from '@ngrx/store';
import { CmPipe } from 'src/app/shared/pipes/cm.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';


@Component({
    selector: 'app-product-visitor',
    standalone: true,
    imports: [CommonModule, ImageSliderComponent, CmPipe, FlexLayoutModule],
    templateUrl: './product-visitor.component.html',
    styleUrls: ['./product-visitor.component.scss']
})
export class ProductVisitorComponent implements OnInit {

    imgUrls: string[] = []

    constructor(

        private fsService: FirestoreService,
        private store: Store<fromRoot.SuringarState>) { }

    product$: Observable<any>

    ngOnInit(): void {
        this.store.select(fromRoot.getVisitorCategoryId).subscribe((categoryId: string) => {
            console.log(categoryId)
            this.store.select(fromRoot.getVisitorProductId).subscribe((productId: string) => {
                console.log(productId)
                const pathToProduct = `categories/${categoryId}/products/${productId}`
                this.product$ = this.fsService.getDoc(pathToProduct)
                this.fsService.getDoc(pathToProduct).subscribe((product: Product) => {
                    if (product) {
                        console.log(product)
                        this.imgUrls = product.imageUrls
                    }
                })
            })

        })

    }
}
