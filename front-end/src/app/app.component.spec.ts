import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome'
import {CarouselComponent} from '../app/MiddleContent/carousel/carousel.component';
import {HeaderComponent} from '../app/TopContent/header/header.component'
import { NavigationBarComponent } from './TopContent/navigation-bar/navigation-bar.component';
import { FooterComponent } from './BottomContent/footer/footer.component';
import {TopLinkComponent} from '../app/TopContent/top-link/top-link.component'
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,FontAwesomeModule, FormsModule,NgbModule
      ],
      declarations: [
        AppComponent,
        CarouselComponent,
        HeaderComponent,
        NavigationBarComponent,
        FooterComponent,
        TopLinkComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

 

  
});
