import { Injectable } from '@angular/core';
import {AuthoCookiesHandlerService} from './autho-cookies-handler.service'
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HTTPRequestService {
  localhost:"http://localhost:4200"

  constructor(private http: HttpClient, private authoCookie: AuthoCookiesHandlerService) { }
  GetProductCarousel(){
    return this.http.get("https://localhost:44300/api/Product/carousel");
  }
  GetProductDisplay(){
     return this.http.get("https://localhost:44300/api/Product/Display");
  }
  GetProduct(){
      return this.http.get("https://localhost:44300/api/Product/GetAll");
  }
  LoadProductOnCategories(filter) {
      console.log(filter)
      return this.http.post("https://localhost:44300/api/Product/categories", filter);
  }
  SignIn(user)
  {
    return this.http.post("https://localhost:44300/api/Customer/SignIn", user, 
                          {observe:'response'});
  }
  VerifySignIn(){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authoCookie.getAuth())
    return this.http.get("https://localhost:44300/api/Customer/Get",{headers:headers});
  }

  SignUp(userDetails){
    return this.http.post("https://localhost:44300/api/Customer/Create",userDetails);
  }

  AddProduct(productDetails){
      return  this.http.post(this.localhost+ "/Product",productDetails);
  }

  Checkout(Products)
  {
     let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authoCookie.getAuth());
     return this.http.post("https://localhost:44300/api/Orders/Create",Products,{headers: headers})
  }
}

