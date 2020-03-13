import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HTTPRequestService {

  constructor(private http: HttpClient) { }
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
      return this.http.post("https://localhost:44300/Product/categories",filter);
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

