import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVisitorComponent } from './product-visitor.component';

describe('ProductVisitorComponent', () => {
  let component: ProductVisitorComponent;
  let fixture: ComponentFixture<ProductVisitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductVisitorComponent]
    });
    fixture = TestBed.createComponent(ProductVisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
