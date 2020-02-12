import { Component, OnInit } from '@angular/core';
import {faFacebookF,faTwitter,faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faEnvelopeOpen,faPhone} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    facebookIcon = faFacebookF;
    twitterIcon = faTwitter;
    instagramIcon = faInstagram
    envelope = faEnvelopeOpen
    phone =faPhone;
  constructor() { }

  ngOnInit() {
  }

}
