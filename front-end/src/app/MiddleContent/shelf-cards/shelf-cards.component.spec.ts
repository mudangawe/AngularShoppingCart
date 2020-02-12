import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfCardsComponent } from './shelf-cards.component';

describe('ShelfCardsComponent', () => {
  let component: ShelfCardsComponent;
  let fixture: ComponentFixture<ShelfCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
