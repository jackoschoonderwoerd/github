import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryComponent } from './category.component';

describe('ProductCategoryComponent', () => {
    let component: ProductCategoryComponent;
    let fixture: ComponentFixture<ProductCategoryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ProductCategoryComponent]
        });
        fixture = TestBed.createComponent(ProductCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
