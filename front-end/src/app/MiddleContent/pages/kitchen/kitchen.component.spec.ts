import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KitchenComponent } from './kitchen.component';
import {CategoriesComponent} from '../../categories/categories.component';
import {PaginationComponent} from '../../../shared/pagination/pagination.component';
 import {ReactiveFormsModule, FormsModule} from '@angular/forms'
 import {ProductsComponent} from '../../../shared/products/products.component'
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
describe('KitchenComponent', () => {
  let component: KitchenComponent;
  let fixture: ComponentFixture<KitchenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenComponent,CategoriesComponent ,PaginationComponent,ProductsComponent],
      imports:[ReactiveFormsModule,FormsModule,NgbModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
