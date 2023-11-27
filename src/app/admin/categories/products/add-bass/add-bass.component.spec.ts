import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBassComponent } from './add-bass.component';

describe('AddBassComponent', () => {
  let component: AddBassComponent;
  let fixture: ComponentFixture<AddBassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddBassComponent]
    });
    fixture = TestBed.createComponent(AddBassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
