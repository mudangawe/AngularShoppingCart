import { Component, OnInit } from '@angular/core';
import {HTTPRequestService} from '../../services/httprequest.service'
import{DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  productData :any ;
  firstProduct :any ;
  imageUrl ="assets/Images/BEDROOM/Bed.png";
  
  constructor(private http: HTTPRequestService, private sanitizer: DomSanitizer) {
    this.geIteams();
   }

  ngOnInit() {
  }

  geIteams(): void
  {
    this.http.GetProductCarousel().subscribe(response => {this.setItemsData(response)});
  }
  setItemsData(products)
  {
    this.productData =products;
    this.firstProduct = this.productData.splice(0,1);
  }
  
  
}
