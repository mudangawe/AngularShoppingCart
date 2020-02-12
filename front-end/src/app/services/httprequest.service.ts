import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HTTPRequestService {

  constructor(private http: HttpClient) { }
  LoadProduct(features){
    return this.http.get("https://localhost:44300/Product/" + features);
  }
  LoadProductOnCategories(filter) {
      return this.http.post("https://localhost:44300/Product/categories",filter);
  }
  AddUserRequest(userDetails)
  {
    this.http.post("https://localhost:44300/Register",userDetails);
  }
  AddProduct(productDetails)
  {
      return  this.http.post("https://localhost:44300/Product",productDetails);
  }
}
