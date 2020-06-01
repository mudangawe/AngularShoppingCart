import { Injectable,Inject } from '@angular/core';
import { Observable, Subject, ObservedValueOf } from 'rxjs'
import { filterData , Cartproduct} from '../Interface/Filter'
import {LOCAL_STORAGE,StorageService} from 'ngx-webstorage-service'


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
  constructor( @Inject(LOCAL_STORAGE) private storage: StorageService) { 
    if(this.storage.get('cart') != null)
    {
      this.cart = this.storage.get('cart');

    }
  }
  
  getProduct() {
    
    let from = (this.page * this.perPage) - this.perPage;
    let to = (this.page * this.perPage);
    return this.OnDisplayQueue.slice(from, to);
  }
  addToCart(item): void {
    let index = this.getIndexOfItem(item)
    if (index == -1 ) {
      this.cartProduct = {
        ProductId : item.productId,
        Name: item.name,
        Quantity : 1,
        Price: item.price,
        imageUrl: item.imageUrl,
        SubTotal:  item.price,
        Discount:0
       } 
      this.cart.push(this.cartProduct);
      this.saveCartToLocalStorage();
    }
    else
    {
      this.cart[index].Quantity++;
      this.cart[index].SubTotal = item.price * this.cart[index].Quantity ;
    }
   
  }
  clearCart()
  {
    this.cart = [];
  }
  saveCartToLocalStorage(){
    if(this.storage.get('cart') != null)
      {
        this.storage.remove('cart');
      }
      this.storage.set('cart',this.cart);
  }
  getIndexOfItem(item) {
    for (let index = 0; index < this.cart.length; index++) {
      if (this.cart[index].ProductId == item.productId) {
        return index;
      }
    }
    return -1;
  }
  updateCart(cart)
  {
    this.cart = cart;
    this.saveCartToLocalStorage();
  }
  getItems() {
    return this.cart;
  }
  sendLengthOfCart() {
    this.subject.next({ cart: this.cart})
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
