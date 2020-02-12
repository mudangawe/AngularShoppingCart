import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactusComponent } from './contactus.component';
import {FormsModule} from '@angular/forms'
import {ReactiveFormsModule} from '@angular/forms'
import { DebugElement } from '@angular/core';
describe('ContactusComponent', () => {
  let component: ContactusComponent;
  let fixture: ComponentFixture<ContactusComponent>;
  let de: DebugElement;
  let le: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusComponent ],
      imports:[FormsModule,ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("it should set submitted to true", async(()=> {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }))
  it("form should be invalid",async(()=>{
    component.contactUsGroup.controls["name"].setValue('');
    component.contactUsGroup.controls["lastname"].setValue('');
    component.contactUsGroup.controls["contact"].setValue('');
    component.contactUsGroup.controls["email"].setValue('');
    component.contactUsGroup.controls['message'].setValue('');
    expect(component.contactUsGroup.valid).toBeFalsy();
  }))
  it("form should be valid",async(()=> {
    component.contactUsGroup.controls["name"].setValue('Ndivhuwo');
    component.contactUsGroup.controls["lastname"].setValue('Ramashia');
    component.contactUsGroup.controls["contact"].setValue('0769135509');
    component.contactUsGroup.controls["email"].setValue("frans@gmail.com");
    component.contactUsGroup.controls["message"].setValue("Frans");
    expect(component.contactUsGroup.valid).toBeTruthy();
  }))
});
