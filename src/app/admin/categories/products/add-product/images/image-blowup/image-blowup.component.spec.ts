import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBlowupComponent } from './image-blowup.component';

describe('ImageBlowupComponent', () => {
  let component: ImageBlowupComponent;
  let fixture: ComponentFixture<ImageBlowupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ImageBlowupComponent]
    });
    fixture = TestBed.createComponent(ImageBlowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
