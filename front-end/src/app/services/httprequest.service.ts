import { Injectable } from '@angular/core';
import {AuthoCookiesHandlerService} from './autho-cookies-handler.service'
import {HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HTTPRequestService {

  constructor(private http: HttpClient, private authoCookie: AuthoCookiesHandlerService) { }
  GetProductCarousel(){
    return this.http.get("https://localhost:44300/Product/carousel");
  }
  GetProductDisplay(){
    return this.http.get("https://localhost:44300/Product/Display");
  }
  GetProduct(){
    return this.http.get("https://localhost:44300/Product/carousel");
  }
  LoadProductOnCategories(filter) {
      return this.http.post("https://localhost:44300/Product/categories", filter);
  }
  SignIn(user)
  {
    return this.http.post("https://localhost:44300/api/Customer/SignIn", user, 
                          {observe:'response'});
  }
  VerifySignIn()
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authoCookie.getAuth())
    return this.http.get("https://localhost:44300/api/Customer/Get",{headers:headers});
  }
  SignUp(userDetails)
  {
    return this.http.post("https://localhost:44300/api/Customer/Create",userDetails);
  }
  AddProduct(productDetails)
  {
      return  this.http.post("https://localhost:44300/Product",productDetails);
  }
}

