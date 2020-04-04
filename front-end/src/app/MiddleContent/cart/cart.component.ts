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
<<<<<<< HEAD
    this.total =  this.cart.reduce((subTotal,item) => subTotal + item.SubTotal ,0 )
    console.log(this.total)
=======
    this.total =  this.cart.reduce((subTotal,item) => subTotal + item.subTotal ,0 )
  
>>>>>>> master
  }
  quantityChanged(qty,index)
  {
    if(qty <= 0)
    {
      this.removeItem(index)
    } else {
      this.cart[index].SubTotal =  this.cart[index].Price * qty;
      this.cart[index].Quantity = qty;
    }

  } 
  updateCart()
  {
      this.items.updateCart(this.cart);
  }
  verifyUser(){
<<<<<<< HEAD
    if(!this.authoCookie.getAuth() == null){
      this.router.navigateByUrl('login');
=======
    if(this.user.anyUserlogIn())
    {
      this.router.navigateByUrl('login')
      this.user.setLoginFirst();
>>>>>>> master
    }
    else
    {
     // this.router.navigateByUrl('Checkout');
      this.http.Checkout(this.cart).subscribe(x => console.log(x));
    }
  }
  removeItem(index){
    this.cart.splice(index,1);
    this.totalPrice();
  }
}
