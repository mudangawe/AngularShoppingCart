import { Component, OnInit } from '@angular/core';
import {IteamsService} from '../../services/iteams.service';
import {UserDetailsService} from '../../services/user-details.service';
import {Cartproduct} from '../../Interface/Filter'
import {faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons'
import {Router} from '@angular/router'

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
  constructor(private items:IteamsService, private user: UserDetailsService, private router:Router) {
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
    this.total =  this.cart.reduce((subTotal,item) => subTotal + item.subTotal ,0 )
  
  }
  quantityChanged(qty,index)
  {
    if(qty <= 0)
    {
      this.removeItem(index)
    } else {
      this.cart[index].subTotal =  this.cart[index].price * qty;
      this.cart[index].quatity = qty;
    }

  } 
  updateCart()
  {
      this.items.updateCart(this.cart);
  }
  verifyUser(){
    if(this.user.anyUserlogIn())
    {
      this.router.navigateByUrl('login')
      this.user.setLoginFirst();
    }
    else
    {
      this.router.navigateByUrl('Checkout')
    }
  }
  removeItem(index){
    this.cart.splice(index,1);
    this.totalPrice();
  }
}
