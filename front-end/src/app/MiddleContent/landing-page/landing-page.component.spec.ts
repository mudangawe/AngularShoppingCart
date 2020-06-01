import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome'
import { LandingPageComponent } from './landing-page.component';
import {CarouselComponent} from '../../../app/MiddleContent/carousel/carousel.component';
import {ShelfCardsComponent} from '../shelf-cards/shelf-cards.component'
import {ProductsComponent} from '../../shared/products/products.component'
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent,CarouselComponent,
                     ShelfCardsComponent,
                    ProductsComponent],
      imports:[FontAwesomeModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
