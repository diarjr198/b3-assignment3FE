import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFinalComponent } from './checkout-final.component';

describe('CheckoutFinalComponent', () => {
  let component: CheckoutFinalComponent;
  let fixture: ComponentFixture<CheckoutFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
