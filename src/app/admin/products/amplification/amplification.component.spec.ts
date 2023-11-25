import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplificationComponent } from './amplification.component';

describe('AmplificationComponent', () => {
  let component: AmplificationComponent;
  let fixture: ComponentFixture<AmplificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AmplificationComponent]
    });
    fixture = TestBed.createComponent(AmplificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
