import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnComponent } from './warn.component';

describe('WarnComponent', () => {
  let component: WarnComponent;
  let fixture: ComponentFixture<WarnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WarnComponent]
    });
    fixture = TestBed.createComponent(WarnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
