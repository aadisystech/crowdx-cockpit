import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from './order.model';
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
  isDateValid = true;

  options = {
    format: "DD-MM-YYYY HH:mm:SS",
    buttons: { showClose: true }, icons: { clear: 'fa fa-trash' }
  };

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

  checkToDate() {
    console.log('checkToDate called');
    if (this.ordersService.searchForm.get("entryDateFrom")) {
      let toDate = this.ordersService.searchForm.get("entryDateTo").value;
      if (toDate.isBefore(this.ordersService.searchForm.get("entryDateFrom").value)) {
        console.log("WORKING To");
        this.isDateValid = false;
      } else {
        this.isDateValid = true;
      }
    } else {
      this.isDateValid = true;
    }
  }

  checkFromDate() {
    console.log('checkFromDate called');
    if (this.ordersService.searchForm.get("entryDateTo")) {
      let fromDate = this.ordersService.searchForm.get("entryDateFrom").value;
      if (fromDate.isAfter(this.ordersService.searchForm.get("entryDateTo").value)) {
        console.log("WORKING From");
        this.isDateValid = false;
      } else {
        this.isDateValid = true;
      }
    } else {
      this.isDateValid = true;
    }
  }


}
