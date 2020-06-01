import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LivingRoomComponent } from './living-room.component';
import {CategoriesComponent} from '../../categories/categories.component'
import {PaginationComponent} from '../../../shared/pagination/pagination.component'
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {ProductsComponent} from '../../../shared/products/products.component'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {HttpClientTestingModule} from '@angular/common/http/testing'
describe('LivingRoomComponent', () => {
  let component: LivingRoomComponent;
  let fixture: ComponentFixture<LivingRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivingRoomComponent, CategoriesComponent ,PaginationComponent,ProductsComponent],
      imports:[ReactiveFormsModule,FormsModule,NgbModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
