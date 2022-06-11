import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.getOrders();
  }

  totalPrice(items: any): any{
    var price = 0;
    for(var i = 0; i < items.length; i++){
      price += this.api.getProduct(items[i].productId).price*items[i].count;
    }
    return price;
  }

}
