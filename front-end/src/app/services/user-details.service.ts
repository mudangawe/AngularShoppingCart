import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, ObservedValueOf } from 'rxjs'
import {AuthoCookiesHandlerService} from '../services/autho-cookies-handler.service'
import {LOCAL_STORAGE,StorageService} from 'ngx-webstorage-service'
@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {
  profile:any;
  login=false;
  private MonitoringUser = new Subject<any>();
  constructor(private authCookie: AuthoCookiesHandlerService,
              @Inject(LOCAL_STORAGE) private storage: StorageService) {
    
   }

   getUserDetails(){
    let userDetails= {'firstName': this.storage.get('firstname'),
                      'lastName':  this.storage.get('lastname')}
    return userDetails;
    }

  setUserDetails(user){
    console.log(user)
    this.storage.set('firstname', user.firstName);
    this.storage.set('lastname', user.lastName);
    this.setUpdateuser();
  }

  anyUserlogIn(){
    return this.authCookie.getAuth() == null ? false:true;
  }
  
  logout(){
    this.profile = undefined;
    this.authCookie.deleteAuth();
    this.setUpdateuser()
  }
  setUpdateuser()
  {
    let anyUser = this.authCookie.getAuth() == null ? false: true;
    console.log(anyUser);
    this.MonitoringUser.next({isUserOn: anyUser});
  }
  updateuser():Observable<any>{
    return this.MonitoringUser.asObservable();
  }
}
