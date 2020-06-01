import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {IteamsService} from '../../services/iteams.service'
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
declare var paypal;
@Component({
  selector: 'app-pay-pal-form',
  templateUrl: './pay-pal-form.component.html',
  styleUrls: ['./pay-pal-form.component.css']
})
export class PayPalFormComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showSuccess =false;
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  cart: any;
  constructor(private items: IteamsService)
  {
    this.cart = this.items.getItems();
    this.initConfig();
  }
  paidFor = false;

  ngOnInit() {
  /*  paypal
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
      .render(this.paypalElement.nativeElement); */ 
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AZMneH6RHk6Aq9V2EzXhf-6Tc9YfQfJSrrohplVRhdxngeycPxe7WT6_zF7srLkdfgQ2HVFVj8TM14IZ',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}