import { Component, OnInit } from '@angular/core';
import {UserDetailsService} from '../../services/user-details.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = {
    firstName:'',
    lastName:''
  }

  constructor(private user:UserDetailsService) { 
    if(this.user.anyUserlogIn())
    {
      this.profile = this.user.getUserDetails();
    }
  }

  ngOnInit() {
  }

  logout(){
    this.user.logout();
    
  }
}
