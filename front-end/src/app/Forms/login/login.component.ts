import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../Interface/Filter';
import {HTTPRequestService} from '../../services/httprequest.service';
import {IteamsService} from '../../services/iteams.service'
import {UserDetailsService} from '../../services/user-details.service';
import {Router} from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthoCookiesHandlerService} from '../../services/autho-cookies-handler.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  title = "Log In";
  errorMessage:any
  loginDetails={
    Email: "",
    Password:""
  }
  submitted = false
  constructor(private http:HTTPRequestService, private response:IteamsService, 
              private user: UserDetailsService,private router:Router, 
              private authCookie: AuthoCookiesHandlerService) {
    this.createLoginForm();
    if(authCookie.getAuth() != null)
    {
      this.router.navigateByUrl("");
    }
   }

  ngOnInit() {
  }
  createLoginForm():void{
    this.loginGroup = new FormGroup({
        'Email':new FormControl(this.loginDetails.Email,[Validators.required,Validators.email]),
        'Password':new FormControl(this.loginDetails.Password, [Validators.minLength(8)])
    }) 
  }
  onSubmit()
  {
    this.http.SignIn(this.loginGroup.value).subscribe(response => { this.testToken(response.body)}, 
                                                      (error:HttpErrorResponse) => { this.notifyUser(error.error)})                                         
    this.submitted =true;
  }
  openDialog(){
    
  }
  testToken(response)
  {
    this.authCookie.setAuth(response.tokenString),
    this.http.VerifySignIn().subscribe(response => this.assignUserDetails(response),
                                                           (error:HttpErrorResponse)=>this.notifyUser(error.error)
                                                           ) ;                                                   
  }
  notifyUser(response)
  {
    this.errorMessage = response;
    this.response.closeDialog(response);
  }
  assignUserDetails(response)
  {
    this.errorMessage = " ";
    this.user.setUserDetails(response);
    this.response.closeDialog(response);
    this.router.navigateByUrl("");
  }
  

}
