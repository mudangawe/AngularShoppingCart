import { Injectable } from '@angular/core';
import {Profile} from '../Interface/Filter'
@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  profile:Profile;
  login=false
  constructor() {
    
   }
   getUserData(){
    return this.profile;
  }
  setUserData(user){
    this.profile = user;
    this.login =true;
  }
  anyUserlogIn(){
    return this.login;
  }
  logout(){
    this.profile = undefined;
    this.login = false;
  }
}
