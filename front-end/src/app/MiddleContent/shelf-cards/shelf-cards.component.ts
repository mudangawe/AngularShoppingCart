import { Component, OnInit } from '@angular/core';
import {HTTPRequestService} from '../../services/httprequest.service'
@Component({
  selector: 'app-shelf-cards',
  templateUrl: './shelf-cards.component.html',
  styleUrls: ['./shelf-cards.component.css']
})
export class ShelfCardsComponent implements OnInit {
  displayProduct: any;

  constructor(private serivce: HTTPRequestService) {
    this.getShelves();
   }

  ngOnInit() {
  }
  getShelves():void
  {
    this.serivce.LoadProduct("display").subscribe(response => {this.setDisplayData(response) });
  }
  setDisplayData(products)
  { 
    this.displayProduct = products
  }

}
