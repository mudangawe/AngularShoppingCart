import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {BrowserModule,By} from '@angular/platform-browser'
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms'
import { DebugElement } from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import {RouterTestingModule} from '@angular/router/testing'
import { from } from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set submitted to true',async(()=>
  {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }));
  it('should call onSubmit Method', async(() =>
  { fixture.detectChanges();
    spyOn(component,'onSubmit')
    el = (fixture.debugElement.query(By.css('button')).nativeElement).click;
    expect(component.onSubmit).toHaveBeenCalledTimes(0)
  }));
  it('form should be invalid',async(()=>{
    component.loginGroup.controls['Email'].setValue('ndivhuwo');
    component.loginGroup.controls['Password'].setValue('frans');
    expect(component.loginGroup.valid).toBeFalsy();
  }));
  it('form should be valid', async(()=>{
    component.loginGroup.controls['Email'].setValue("Ndivhuwo@gmail.com");
    component.loginGroup.controls['Password'].setValue("Ramashias")
    expect(component.loginGroup.valid).toBeTruthy();
  }))

});
