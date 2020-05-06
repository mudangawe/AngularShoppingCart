import { Component, OnInit, Input } from '@angular/core';
import {IteamsService} from '../../services/iteams.service'
import {HTTPRequestService} from '../../services/httprequest.service'
import {filterData} from '../../Interface/Filter'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() filter:filterData;
  @Input() categories: any;
  productItem =[]
  constructor(private items:IteamsService, private http: HTTPRequestService) { 
   
   
  }

  ngOnInit() {
    this.getIteams();
    this.items.updateProductOnScreen().subscribe(response => {this.getIteams()});
  }

  getIteams():void{
    
    if(this.filter)
    {
      this.http.LoadProductOnCategories(this.filter).subscribe(response => {this.setProduct(response)});
    }
    else{
      this.http.GetProduct().subscribe(response => {this.setProduct(response)});
    }
  
  }
  setProduct(products) {
    
    this.productItem = products;
  }
  addToCart(item)
  {
    this.items.addToCart(item)
    this.items.sendLengthOfCart();
  }
}
