import { Component, OnInit, OnChanges } from '@angular/core';
import {faUser,faCartArrowDown,faBell } from '@fortawesome/free-solid-svg-icons'
import {IteamsService} from '../../services/iteams.service'
import {UserDetailsService} from '../../services/user-details.service'
import {AuthoCookiesHandlerService} from '../../services/autho-cookies-handler.service'
import {} from '../../services/user-details.service'
import {Subscription} from 'rxjs'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements  OnChanges {
  faUserCog = faUser;
  cart = faCartArrowDown;
  notification =faBell;
  CartItems =[]
  subscription: Subscription;
  subscriptions: Subscription;
  isLogin :any;
  constructor( private items: IteamsService, private users: UserDetailsService ,
              private authoCookie: AuthoCookiesHandlerService) {

    this.subscription = this.items.getLengthOfCart().subscribe(length =>this.CartItems =length.cart); 
    this.subscription = this.users.updateuser().subscribe(data =>this.isLogin = this.authoCookie.getAuth() != null? true:false);
  
   }

  ngOnInit() {
    this.isLogin = this.authoCookie.getAuth() != null? true:false
  }
  getLengthOfCart()
  {
    let length = this.items.getItems().length;
  
  }
  ngOnChanges() {
    // changes.prop contains the old and the new value...
  }

}
