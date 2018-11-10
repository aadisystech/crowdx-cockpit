import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
import { FormControl, FormGroup } from '@angular/forms';
import { PagerService } from '../utilities/pager/pager.service';
import { LoaderService } from '../utilities/loader/loader.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: []
})
export class OrdersComponent implements OnInit {

  dateOperators: string[] = ['eq', 'le', 'ge', 'bt'];
  records: number[] = [10, 25, 50, 100];

  constructor(public ordersService: OrdersService, private router: Router) { }

  ngOnInit() {
  }

  getOrders() {
    this.ordersService.getOrders();
    this.ordersService.getOrdersTotalCount();
  }

  goToDetails(order: Order) {
    this.ordersService.selectedOrder = order;
    this.router.navigate(['order-details', order.id]);
  }  
 

}
