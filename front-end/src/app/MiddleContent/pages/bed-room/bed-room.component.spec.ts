import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CategoriesComponent} from '../../categories/categories.component'
import { BedRoomComponent } from './bed-room.component';
import {PaginationComponent} from '../../../shared/pagination/pagination.component'
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {RouterTestingModule } from '@angular/router/testing';
import {ProductsComponent} from '../../../shared/products/products.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {HttpClientTestingModule} from '@angular/common/http/testing'
describe('BedRoomComponent', () => {
  let component: BedRoomComponent;
  let fixture: ComponentFixture<BedRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedRoomComponent,CategoriesComponent,PaginationComponent,ProductsComponent],
      imports:[ReactiveFormsModule,FormsModule,RouterTestingModule,NgbModule,
              HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
