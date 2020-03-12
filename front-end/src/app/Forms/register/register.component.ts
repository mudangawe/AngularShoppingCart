import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import {HTTPRequestService} from "../../services/httprequest.service"
import {MatDialog} from '@angular/material/dialog'
import {IteamsService} from '../../services/iteams.service'
import {MessageComponent} from '../../shared/dialogs/message/message.component'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerGroup: FormGroup;
  registerDeatils = {
    FirstName: "",
    MiddleName: "",
    LastName:"",
    IdentityNumber:"",
    Email: "",
    PhoneNumber: "",
    AdditionalNumber: "",
    Password: "",
    ConfirmPassword: "",
    Address:""
  }
  submitted = false
  constructor(private http: HTTPRequestService, public dialog:MatDialog, private Response:IteamsService) {
    this.createRegister();
  }

  ngOnInit() {
  }
  createRegister(): void {
    this.registerGroup = new FormGroup({
      'FirstName': new FormControl(this.registerDeatils.FirstName, [Validators.required]),
      'MiddleName': new FormControl(this.registerDeatils.MiddleName),
      'LastName': new FormControl(this.registerDeatils.LastName, [Validators.required]),
      'Email': new FormControl(this.registerDeatils.Email, [Validators.required, Validators.email]),
      'IdentityNumber': new FormControl(this.registerDeatils.IdentityNumber, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      'PhoneNumber': new FormControl(this.registerDeatils.PhoneNumber, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
      'AdditionalNumber': new FormControl(this.registerDeatils.AdditionalNumber, [Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
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
    this.dialog.open(MessageComponent, {
      data: {
        title: 'Please wait ',
        message:"Register in Progress",
        height: '400px',
        width: '600px',
      }
    });
  }
  actOnResponse(response)
  {
    this.Response.intitialCloseDialog(true)

  }

}