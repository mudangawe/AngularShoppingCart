import { Injectable } from '@angular/core';
import {Profile} from '../Interface/Filter'
import { Observable, Subject, ObservedValueOf } from 'rxjs'
import {AuthoCookiesHandlerService} from '../services/autho-cookies-handler.service'
@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {
  profile:any;
  login=false;
  loginFirst=false;
  private MonitoringUser = new Subject<any>();
  constructor(private authCookie: AuthoCookiesHandlerService) {
    
   }

   getUserDetails(){
    return this.profile;
    }

  setUserDetails(user){
    this.profile = user;
    this.login =true;
    this.setUpdateuser();
  }

  anyUserlogIn(){
    return this.login;
  }
  getLoginFirst()
  {
    return this.loginFirst
  }
  setLoginFirst()
  {
    if(this.loginFirst)
    {
      this.loginFirst = false;
    }else{
      this.loginFirst =true;
    }
  }
  logout(){
    this.profile = undefined;
    this.authCookie.deleteAuth();
    this.setUpdateuser()
  }
  setUpdateuser()
  {
    this.MonitoringUser.next({isUserOn: this.login});
  }
  updateuser():Observable<any>{
    return this.MonitoringUser.asObservable();
  }
}
