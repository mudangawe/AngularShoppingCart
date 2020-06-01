import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiningRoomComponent } from './dining-room.component';
import {CategoriesComponent} from '../../categories/categories.component';
import {PaginationComponent} from '../../../shared/pagination/pagination.component';
import {ReactiveFormsModule,FormsModule, NgModel} from '@angular/forms';
import {ProductsComponent} from '../../../shared/products/products.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {HttpClientTestingModule} from '@angular/common/http/testing'
describe('DiningRoomComponent', () => {
  let component: DiningRoomComponent;
  let fixture: ComponentFixture<DiningRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiningRoomComponent ,CategoriesComponent,PaginationComponent,ProductsComponent],
      imports:[ReactiveFormsModule,FormsModule,NgbModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
