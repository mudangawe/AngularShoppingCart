import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  loginDetails={
    Email: " ",
    Password:" "
  }
  submitted = false
  constructor() {
    this.createLoginForm();
   }

  ngOnInit() {
  }
  createLoginForm():void{
    this.loginGroup = new FormGroup({
        'Email':new FormControl(this.loginDetails.Email,[Validators.required,Validators.email]),
        'Password':new FormControl(this.loginDetails.Password, [Validators.required,Validators.minLength(8),Validators.maxLength(12)])
    }) 
  }
  onSubmit()
  {
    this.submitted = true;
  }

}
