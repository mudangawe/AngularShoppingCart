import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {IteamsService} from '../../services/iteams.service'
declare var paypal;
@Component({
  selector: 'app-pay-pal-form',
  templateUrl: './pay-pal-form.component.html',
  styleUrls: ['./pay-pal-form.component.css']
})
export class PayPalFormComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  cart: any
  constructor(private items: IteamsService)
  {
    this.cart = this.items.getItems();
  }
  paidFor = false;

  ngOnInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "ssssss",
                amount: {
                  currency_code: 'USD',
                  value: this.cart.reduce((subTotal,item) => subTotal + item.subTotal ,0 ) / 15.27
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          this.paidFor = true;
        },
        onError: err => {
          console.log(err);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}