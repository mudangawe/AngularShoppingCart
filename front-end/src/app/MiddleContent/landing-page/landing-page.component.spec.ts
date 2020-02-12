import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome'
import { LandingPageComponent } from './landing-page.component';
import {CarouselComponent} from '../../../app/MiddleContent/carousel/carousel.component';
import {HeaderComponent} from '../../../app/TopContent/header/header.component'
import {ShelfCardsComponent} from '../shelf-cards/shelf-cards.component'
import {ProductsComponent} from '../../shared/products/products.component'
import {TopLinkComponent} from '../../TopContent/top-link/top-link.component'
describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageComponent,CarouselComponent,
                    HeaderComponent, ShelfCardsComponent,
                    ProductsComponent,TopLinkComponent],
      imports:[FontAwesomeModule]
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
