import { Component } from '@angular/core';
import {AuthoCookiesHandlerService} from '../app/services/autho-cookies-handler.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  constructor(private authCookie: AuthoCookiesHandlerService){
    if(!this.authCookie.getAuth())
    {
      
    }
  }
}
