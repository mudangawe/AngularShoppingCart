import { Component, OnInit } from '@angular/core';
import {HTTPRequestService} from '../../services/httprequest.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-shelf-cards',
  templateUrl: './shelf-cards.component.html',
  styleUrls: ['./shelf-cards.component.css']
})
export class ShelfCardsComponent implements OnInit {
  displayProduct: any;

  constructor(private serivce: HTTPRequestService,
              private router:Router) {
    this.getShelves();
   }

  ngOnInit() {
  }
  getShelves():void
  {
    this.serivce.GetProductDisplay().subscribe(response => {this.setDisplayData(response) });
  }
  setDisplayData(products)
  { 
    this.displayProduct = products
  }
  navigating(index)
  { 
    this.router.navigateByUrl('/'+ this.displayProduct[index].category)
  }

}
