import { Injectable } from '@angular/core';
import {Profile} from '../Interface/Filter'
import { Observable, Subject, ObservedValueOf } from 'rxjs'
@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {
  profile:any;
  login=false;
  loginFirst=false;
  private MonitoringUser = new Subject<any>();
  constructor() {
    
   }

   getUserData(){
    return this.profile;
    }

  setUserData(user){
    this.profile = user;
    console.log( this.profile )
    this.login =true;
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
    this.login = false;
  }
  setUpdateuser()
  {
    this.MonitoringUser.next({isUserOn: this.login})
  }
  updateuser():Observable<any>{
    return this.MonitoringUser.asObservable();
  }
}
