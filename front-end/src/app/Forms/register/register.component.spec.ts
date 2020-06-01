import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms'
import {By} from '@angular/platform-browser'
import { RegisterComponent } from './register.component';
import { DebugElement } from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing'
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el:HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[ReactiveFormsModule,HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('it should set submitted to true', async(() =>
  {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }))
  it('it should call onSumit method', async(()=>{
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('button')).nativeElement
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }))
  it('form should be invalid', async(()=>
  {
    component.registerGroup.controls['FullName'].setValue('')
    component.registerGroup.controls['Email'].setValue('')
    component.registerGroup.controls['Password'].setValue('')
    component.registerGroup.controls['ConfirmPassword'].setValue('')
    expect(component.registerGroup.valid).toBeFalsy();
  }))
  it('form should be valid', async(()=>
  {
    component.registerGroup.controls['FullName'].setValue('Ndivhuwo')
    component.registerGroup.controls['Email'].setValue('ramashia@gmail.com')
    component.registerGroup.controls['Password'].setValue('Ramashiag')
    component.registerGroup.controls['ConfirmPassword'].setValue('Ramashiag')
    expect(component.registerGroup.valid).toBeTruthy();
  }))
});
