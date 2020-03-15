import { Injectable } from '@angular/core';
import { Observable, Subject, ObservedValueOf } from 'rxjs'
import { filterData , Cartproduct} from '../Interface/Filter'



@Injectable({
  providedIn: 'root'
})

export class IteamsService {
  perPage = 10;
  pages: any;
  page = 1;
  OnDisplayQueue = []
  filteringInfo: filterData
  private subject = new Subject<any>();
  private subjectPage = new Subject<any>();
  private subjectPagination = new Subject<any>();
  private httpResponse = new Subject<any>();
  items =[];
  cart  =[];
  cartProduct :Cartproduct
  constructor() { }
  
  
  
  getProduct() {
    
    let from = (this.page * this.perPage) - this.perPage;
    let to = (this.page * this.perPage);
   
    return this.OnDisplayQueue.slice(from, to);
  }
  addToCart(item): void {
    let index = this.getIndexOfItem(item)
    console.log(index);
    if (index == -1 ) {
      this.cartProduct = {
        id : item.productID,
        name: item.name,
        quatity : 1,
        price: item.price,
        imageUrl: item.imageUrl,
        subTotal:  item.price
       } 
      this.cart.push(this.cartProduct);
     
    }
    else
    {
      this.cart[index].quatity++;
      this.cart[index].subTotal = item.price * this.cart[index].quatity ;
    }
   
  }
  getIndexOfItem(item) {
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].id == item.productID) {
        return index;
      }
     
    }
    return -1;
  }
  updateCart(cart)
  {
    this.cart = cart;
  }
  getItems() {
    return this.cart;
  }
  sendLengthOfCart() {
    this.subject.next({ cart: this.cart })

  }
  getLengthOfCart(): Observable<any> {
    return this.subject.asObservable();
  }
  updateProductOnScreen(): Observable<any> {
    return this.subjectPage.asObservable();
  }
  updatePagination(): Observable<any> {
    return this.subjectPagination.asObservable();
  }
  setPages() {
    return this.OnDisplayQueue.length;
  }
  getPage(page) {
    this.page = page;
    this.subjectPage.next({ page: this.page })
  }
  closeDialog(message:any){
    this.httpResponse.next({response: message})
  }
  excuteCloseDialog():Observable<any>{
    return this.httpResponse.asObservable();
  }
  
}
