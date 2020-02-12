import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-bed-room',
  templateUrl: './bed-room.component.html',
  styleUrls: ['./bed-room.component.css']
})
export class BedRoomComponent implements OnInit {
  
  nameOfComponent = "BEDROOM"
  constructor() { }

  ngOnInit() {
  }

}
