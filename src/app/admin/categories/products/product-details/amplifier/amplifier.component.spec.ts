import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmplifierComponent } from './amplifier.component';

describe('AmplifierComponent', () => {
  let component: AmplifierComponent;
  let fixture: ComponentFixture<AmplifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AmplifierComponent]
    });
    fixture = TestBed.createComponent(AmplifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
