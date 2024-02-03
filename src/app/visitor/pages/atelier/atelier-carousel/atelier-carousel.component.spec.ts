import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierCarouselComponent } from './atelier-carousel.component';

describe('AtelierCarouselComponent', () => {
  let component: AtelierCarouselComponent;
  let fixture: ComponentFixture<AtelierCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtelierCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtelierCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
