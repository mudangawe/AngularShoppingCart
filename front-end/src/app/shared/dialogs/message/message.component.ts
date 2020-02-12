import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {IteamsService} from '../../../services/iteams.service';
import { Subscription } from 'rxjs';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<MessageComponent> ,@Inject(MAT_DIALOG_DATA) public data: DialogData , private respondMessage: IteamsService)  { 
    this.respondMessage.getHttpResponse().subscribe(respond => {this.onNoClick()})
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}