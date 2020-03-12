import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../Interface/Filter';
import {HTTPRequestService} from '../../services/httprequest.service';
import {MatDialog} from '@angular/material/dialog'
import {IteamsService} from '../../services/iteams.service'
import {MessageComponent} from '../../shared/dialogs/message/message.component';
import {UserDetailsService} from '../../services/user-details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  title = "Sign in";
  errorMessage:any
  loginDetails={
    Email: " ",
    Password:" "
  }
  submitted = false
  constructor(private http:HTTPRequestService, public dialog:MatDialog, 
    private Response:IteamsService, private user: UserDetailsService, private router:Router ) {
    this.createLoginForm();
   }

  ngOnInit() {
  }
  createLoginForm():void{
    this.loginGroup = new FormGroup({
        'Email':new FormControl(this.loginDetails.Email,[Validators.required,Validators.email]),
        'Password':new FormControl(this.loginDetails.Password, [Validators.required])
    }) 
  }
  onSubmit()
  {
    
    //this.http.LoginAndRegister(this.loginGroup.value).subscribe(response => this.actOnResponse(response))
    this.openDialog();
  }
  openDialog(){
    this.dialog.open(MessageComponent, {
      data: {
        title: 'Please wait ',
        message:"Login in Progress",
        height: '400px',
        width: '600px',
      }
    });
  }
  actOnResponse(response)
  {
    
    this.Response.intitialCloseDialog(true)
    if(!response.loginPassed) 
    {
      this.errorMessage = "Invalid email or incorect password"
    } 
    else
    {
      this.user.setUserData(response);
      if(this.user.getLoginFirst())
      {
        this.router.navigateByUrl('Checkout')
      }
      else
      {
        this.router.navigateByUrl('')
      }
    }
  }

}
