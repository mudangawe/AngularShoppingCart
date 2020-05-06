import { Component, OnInit } from '@angular/core';
import {HTTPRequestService} from '../../services/httprequest.service'
import{DomSanitizer} from '@angular/platform-browser'
import{IteamsService} from '../../services/iteams.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  productData :any ;
  firstProduct :any ;
  imageUrl ="assets/Images/BEDROOM/Bed.png";
  
  constructor(private http: HTTPRequestService, private sanitizer: DomSanitizer
              ,private items:IteamsService, private router: Router) {
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
  buyItNow(product){
     this.items.addToCart(product);
     this.router.navigateByUrl("/Cart")
  }
  
  
}
