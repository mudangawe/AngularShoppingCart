import { Component, OnInit } from '@angular/core';
import {IteamsService} from '../../services/iteams.service';
import {UserDetailsService} from '../../services/user-details.service';
import {Cartproduct} from '../../Interface/Filter'
import {faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons'
import {Router} from '@angular/router'
import {HTTPRequestService} from '../../services/httprequest.service'
import {AuthoCookiesHandlerService} from '../../services/autho-cookies-handler.service'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  trashIcon = faTrash;
  editIcon =faEdit;
  cart :Cartproduct[];
  total: any;
  constructor(private items:IteamsService, private user: UserDetailsService, 
              private router:Router, private authoCookie: AuthoCookiesHandlerService,
              private http: HTTPRequestService) {
    this.getItemsInCart();
   }

  ngOnInit() {
  }

  getItemsInCart(): void
  {
    this.cart = this.items.getItems();
    this.totalPrice();
  }
  totalPrice () {
    this.total =  this.cart.reduce((subTotal,item) => subTotal + item.SubTotal ,0 )
  }
  quantityChanged(qty,index)
  {
    if(qty <= 0)
    {
      this.removeItem(index)
    }
     else 
    {
      this.cart[index].SubTotal =  this.cart[index].Price * qty;
      this.cart[index].Quantity = qty;
      this.updateCart();
    }

  } 
  updateCart()
  {
      this.items.updateCart(this.cart);
      this.totalPrice();
      this.items.sendLengthOfCart();
  }
  verifyUser(){

    if(!this.authoCookie.getAuth() == null){
      this.router.navigateByUrl('/login');
    }
    else
    {
      this.router.navigateByUrl('/Checkout');
      this.http.Checkout(this.cart).subscribe(x => console.log(x));
    }
  }
  removeItem(index){
    this.cart.splice(index,1);
    this.updateCart();
  }
  clearCart()
  {
    this.cart =[];
    this.updateCart()
  }
}
