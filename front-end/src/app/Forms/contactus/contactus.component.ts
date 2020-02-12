import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactUsGroup : FormGroup;
  contactUs = {
    name:"",
    lastName:"",
    contact:"",
    email:"",
    message:""
  }
  submitted =true;
  constructor() { 
    this.createContactUsForm();
  }

  ngOnInit() {
  }
  createContactUsForm()
  {
    this.contactUsGroup = new FormGroup({
      'name': new FormControl(this.contactUs.name,[Validators.required,Validators.min(4)]),
      'lastname': new FormControl(this.contactUs.lastName, [Validators.required,Validators.min(4)]),
      'contact': new FormControl(this.contactUs.contact,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      'email': new FormControl(this.contactUs.email,[Validators.required,Validators.email]),
      'message': new FormControl(this.contactUs.message,[Validators.required])
    })
  }
  onSubmit()
  {
    this.submitted = true;
  }

}
