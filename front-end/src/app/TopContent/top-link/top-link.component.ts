import { Component, OnInit } from '@angular/core';
import {UserDetailsService} from '../../services/user-details.service';
import {AuthoCookiesHandlerService} from '../../services/autho-cookies-handler.service';
import {IteamsService} from '../../services/iteams.service'
import {Subscription} from 'rxjs'
import {faUser,faCartArrowDown,faBell } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-top-link',
  templateUrl: './top-link.component.html',
  styleUrls: ['./top-link.component.css']
})
export class TopLinkComponent implements OnInit {
  subscription: Subscription;
  isLogin:any;
  notification =faBell;
  constructor( private users: UserDetailsService,private authoCookie: AuthoCookiesHandlerService,
               private items: IteamsService) { 
    this.subscription = this.users.updateuser().subscribe(data =>this.isLogin = this.authoCookie.getAuth() != null? true:false);
  }

  ngOnInit() {
    this.isLogin = this.authoCookie.getAuth() != null? true:false
    this.items.sendLengthOfCart();
  }

}
