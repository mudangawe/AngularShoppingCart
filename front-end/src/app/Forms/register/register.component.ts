import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {HTTPRequestService} from "../../services/httprequest.service"
import {IteamsService} from '../../services/iteams.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title ="Sign up"
  registerGroup: FormGroup;
  registerDeatils = {
    FullName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  }
  submitted = false
  constructor(private http: HTTPRequestService, private Response:IteamsService) {
    this.createRegister();
  }

  ngOnInit() {
  }
  createRegister(): void {
    this.registerGroup = new FormGroup({
      'FullName': new FormControl(this.registerDeatils.FullName, [Validators.required]),
      'Email': new FormControl(this.registerDeatils.Email, [Validators.required, Validators.email]),
      'Password': new FormControl(this.registerDeatils.Password, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      'ConfirmPassword': new FormControl(this.registerDeatils.ConfirmPassword, [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
      
    })
  }
  onSubmit() {
    this.submitted = true;
    this.http.SignUp(this.registerGroup.value).subscribe(response => this.actOnResponse(response))
    this.openDialog();
  }
  
  openDialog(){
    
  }
  actOnResponse(response)
  {
    this.Response.closeDialog(true)

  }

}