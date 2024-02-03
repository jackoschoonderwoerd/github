import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BassComponent } from './bass.component';

describe('BassComponent', () => {
  let component: BassComponent;
  let fixture: ComponentFixture<BassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BassComponent]
    });
    fixture = TestBed.createComponent(BassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
