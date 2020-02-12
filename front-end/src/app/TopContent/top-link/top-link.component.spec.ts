import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLinkComponent } from './top-link.component';

describe('TopLinkComponent', () => {
  let component: TopLinkComponent;
  let fixture: ComponentFixture<TopLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
