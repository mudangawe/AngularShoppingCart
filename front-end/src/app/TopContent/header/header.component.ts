import { Component, OnInit, OnChanges } from '@angular/core';
import {faUser,faCartArrowDown,faBell } from '@fortawesome/free-solid-svg-icons'
import {IteamsService} from '../../services/iteams.service'
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
  
  
  constructor( private items: IteamsService, 
              ) {

    this.subscription = this.items.getLengthOfCart().subscribe(length =>this.CartItems =length.cart); 
   
  
   }

  ngOnInit() {
   
  }
  getLengthOfCart()
  {
    let length = this.items.getItems().length;
  
  }
  ngOnChanges() {
    // changes.prop contains the old and the new value...
  }

}
