import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule,ReactiveFormsModule  } from '@angular/forms'
import { CategoriesComponent } from './categories.component';
import {ProductsComponent} from '../../shared/products/products.component'
describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent,ProductsComponent ],
      imports:[ReactiveFormsModule,FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
