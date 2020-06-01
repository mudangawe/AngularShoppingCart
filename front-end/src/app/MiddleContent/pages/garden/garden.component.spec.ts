import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { GardenComponent } from './garden.component';
import {CategoriesComponent} from '../../categories/categories.component';
import {PaginationComponent} from '../../../shared/pagination/pagination.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms' 
import { ProductsComponent} from '../../../shared/products/products.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
describe('GardenComponent', () => {
  let component: GardenComponent;
  let fixture: ComponentFixture<GardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GardenComponent ,CategoriesComponent,PaginationComponent,ProductsComponent],
      imports:[ReactiveFormsModule,FormsModule,NgbModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
