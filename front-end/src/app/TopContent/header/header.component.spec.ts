import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {TopLinkComponent} from '../top-link/top-link.component'
import { HeaderComponent } from './header.component';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome'
import {ProfileComponent} from '../../shared/profile/profile.component'
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent,TopLinkComponent,ProfileComponent ],
      imports:[FontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
