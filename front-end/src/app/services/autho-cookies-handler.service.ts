import { Injectable, Inject } from '@angular/core';
import {LOCAL_STORAGE,StorageService} from 'ngx-webstorage-service'
@Injectable({
  providedIn: 'root'
})
export class AuthoCookiesHandlerService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
   
   }
  setAuth(token):void{
    this.storage.set("token", token )
    console.log(this.getAuth())
  }
  getAuth(){
    return  this.storage.get("token")
  }
  deleteAuth():void{
    localStorage.clear(); 
  }
}
