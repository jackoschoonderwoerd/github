import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBowComponent } from './add-bow.component';

describe('AddBowComponent', () => {
  let component: AddBowComponent;
  let fixture: ComponentFixture<AddBowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddBowComponent]
    });
    fixture = TestBed.createComponent(AddBowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
