import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(public ordersService: OrdersService, private route: Router) { }

  ngOnInit() {
    this.ordersService.getExecutionsForOrderId();
  }

  onBack() {
    this.ordersService.selectedOrder = null;
    this.ordersService.executions = [];
    this.route.navigate(['orders']);
  }

}
