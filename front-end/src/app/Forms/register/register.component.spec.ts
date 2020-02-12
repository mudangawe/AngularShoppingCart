import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms'
import {By} from '@angular/platform-browser'
import { RegisterComponent } from './register.component';
import { DebugElement } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el:HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[ReactiveFormsModule]
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
    component.registerGroup.controls['name'].setValue('')
    component.registerGroup.controls['lastName'].setValue('')
    component.registerGroup.controls['email'].setValue('')
    component.registerGroup.controls['number'].setValue('')
    component.registerGroup.controls['password'].setValue('')
    component.registerGroup.controls['confirmPassword'].setValue('')
    expect(component.registerGroup.valid).toBeFalsy();
  }))
  it('form should be valid', async(()=>
  {
    component.registerGroup.controls['name'].setValue('Ndivhuwo')
    component.registerGroup.controls['lastName'].setValue('Ramashia')
    component.registerGroup.controls['email'].setValue('ramashia@gmail.com')
    component.registerGroup.controls['number'].setValue('0724652112')
    component.registerGroup.controls['password'].setValue('Ramashiag')
    component.registerGroup.controls['confirmPassword'].setValue('Ramashiag')
    expect(component.registerGroup.valid).toBeTruthy();
  }))
});
