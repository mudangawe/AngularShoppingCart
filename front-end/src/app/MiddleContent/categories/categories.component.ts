import { Component, OnInit,Input,ViewChild, AfterViewInit, ViewContainerRef,
  ElementRef,ViewRef, TemplateRef,EventEmitter } from '@angular/core';
import {filterData} from '../../Interface/Filter';
import {IteamsService} from '../../services/iteams.service'
import {ProductsComponent} from '../../shared/products/products.component'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements AfterViewInit {
  @Input() name;
  @ViewChild(ProductsComponent, {static: false}) product:ProductsComponent;
  upDateProduct: EventEmitter<void>;

  filterTemplate = {
  CategoriesName :  null  ,
  PriceLevel :0,
  BrandName : null };
  
  PriceOption =[{name: "0 - 9999",code:1},{name:"1000 - 9999",code:2},{name:"10000 - 5000",code:3}]
  brandOption = ["Adidas","Nike","Puma"]
  brandSelected: any
  constructor(private service : IteamsService) { 
   
    
  }

  ngOnInit() {
    this.filterTemplate.CategoriesName = this.name;
    this.upDateProduct = new EventEmitter<void>();
    this.ngAfterViewInit();
    }
  onSelectPricRange(seleted) {
    this.filterTemplate.PriceLevel = seleted;
    this.filteringOfData();
  }
  
  onSelectBrand(seleted){
    this.filterTemplate.BrandName = seleted;
    this.filteringOfData();
  }
  filteringOfData()
  {
  
    this.filterTemplate.BrandName = this.brandSelected;  
 
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    this.upDateProduct.emit();
    this.upDateProduct.subscribe(
      () => { 
        this.product.getIteams();
      }
    );
  }

 

 
}
