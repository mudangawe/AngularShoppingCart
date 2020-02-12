import { Component, OnInit } from '@angular/core';
import {CarouselComponent} from '../carousel/carousel.component'
import { NgModule } from '@angular/core';

@NgModule({
  declarations:[
    CarouselComponent
  ]
})
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  feature= "Featured"
  constructor() { }

  ngOnInit() {
  }

}
