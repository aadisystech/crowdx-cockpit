import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import * as moment from 'moment'
import { OrderFilter } from './order-filter.model';
import { LoaderService } from '../utilities/loader/loader.service';
import { FormGroup, FormControl } from '@angular/forms';
import { PagerService } from '../utilities/pager/pager.service';
import { Execution } from '../executions/execution.model';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  ORDERS_URL = "api/orders";
  ORDERS_TOTAL_COUNT_URL = "api/orders/totalcount";
  EXECUTIONS_ORDER_ID_URL = "api/executions/orderid/";

  searchForm = new FormGroup({
    orderId: new FormControl('', [Validators.minLength(14)]),
    clientId: new FormControl(''),
    side: new FormControl(''),
    type: new FormControl(''),
    status: new FormControl(''),
    securityId: new FormControl(''),
    entryDateFrom: new FormControl(moment(new Date(new Date().setHours(0, 0, 0, 0)))),
    entryDateTo: new FormControl(moment(new Date()))
  });

  tableControlForm = new FormGroup({
    pageSize: new FormControl(10),
    pageCount: new FormControl(1)
  });

  pageSize: number = 10;
  pageCount: number = 1;
  dateOperator: string = 'eq';
  orders: Order[];
  totalRecords: number;
  pager: any = {};
  showNoDataFoundAlert: boolean = false;

  //details page
  selectedOrder: Order;
  executions: Execution[] = [];

  constructor(private httpClient: HttpClient, private pagerService: PagerService, private loaderService: LoaderService) { }

  getOrders() {
    this.showLoader();
    let filter = new HttpParams();
    let orderFilter: OrderFilter = this.getOrderFilter(this.searchForm.value);
    orderFilter.pageCount = this.pageCount;
    orderFilter.pageSize = this.pageSize;
    filter = filter.append("filter", JSON.stringify(orderFilter));
    return this.httpClient.get<Order[]>(this.ORDERS_URL, { params: filter }).subscribe(
      res => {
        this.orders = res
        if (this.orders.length == 0) {
          this.showNoDataFoundAlert = true;
          setTimeout(() => {
            this.showNoDataFoundAlert = false;
          }, 3000);
        }
        this.hideLoader();
      }
    );
  }

  getOrdersTotalCount() {
    let filter = new HttpParams();
    let orderFilter: OrderFilter = this.getOrderFilter(this.searchForm.value);
    filter = filter.append("filter", JSON.stringify(orderFilter));
    return this.httpClient.get<number>(this.ORDERS_TOTAL_COUNT_URL, { params: filter }).subscribe(
      res => {
        this.totalRecords = res
        this.setPage(1, false);
      }
    );
  }

  getExecutionsForOrderId() {
    this.showLoader();
    return this.httpClient.get<Execution[]>(this.EXECUTIONS_ORDER_ID_URL + this.selectedOrder.id).subscribe(
      res => {
        this.executions = res;
        this.hideLoader();
      }
    )
  }

  setPage(page: number, load: boolean = true) {
    console.log('page ' + page);
    console.log('this.pager.totalPages ' + this.pager.totalPages);
    console.log('this.pager.currentPage ' + this.pager.currentPage);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    if (this.pager.currentPage === page) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalRecords, page, this.pageSize);
    console.log('this.pager ' + this.pager);
    this.pageCount = page;
    if (load) {
      this.showLoader();
      this.getOrders();
    }

  }

  getOrderFilter(formValue: any): OrderFilter {
    let filter: OrderFilter = new OrderFilter();
    if (formValue.orderId != '') {
      filter.orderId = formValue.orderId;
    }
    if (formValue.clientId != '') {
      filter.clientId = formValue.clientId;
    }
    if (formValue.side != '') {
      filter.side = formValue.side;
    }
    if (formValue.type != '') {
      filter.type = formValue.type;
    }
    if (formValue.status != '') {
      filter.status = formValue.status;
    }
    if (formValue.securityId != '') {
      filter.securityId = formValue.securityId;
    }
    if (formValue.entryDateFrom != '') {
      filter.entryDateFrom = formValue.entryDateFrom.format("YYYY-MM-DD HH:mm:ss");
    }
    if (formValue.entryDateTo != '') {
      filter.entryDateTo = formValue.entryDateTo.format("YYYY-MM-DD HH:mm:ss");
    }
    return filter;
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }


}
