import { Component, OnInit, Input } from '@angular/core';
import {IteamsService} from '../../services/iteams.service'


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  size:any;
  page = 1
 
  constructor(private services: IteamsService) { 
    this.services.updatePagination().subscribe(response => {this.getPage()})
  }

  ngOnInit() {
  }

  setPage()
  {
    this.services.getPage(this.page)
    console.log("Update page")
  }
  getPage()
  {
    this.size = this.services.setPages();
  
  }
}
