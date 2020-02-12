import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPalFormComponent } from './pay-pal-form.component';

describe('PayPalFormComponent', () => {
  let component: PayPalFormComponent;
  let fixture: ComponentFixture<PayPalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
