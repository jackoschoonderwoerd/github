import { TestBed } from '@angular/core/testing';

import { ProductsVisitorService } from './products-visitor.service';

describe('ProductsVisitorService', () => {
  let service: ProductsVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
