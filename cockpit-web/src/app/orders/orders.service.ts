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

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  ORDERS_URL = "api/orders";
  ORDERS_TOTAL_COUNT_URL = "api/orders/totalcount";
  EXECUTIONS_ORDER_ID_URL = "api/executions/orderid/";

  searchForm = new FormGroup({
    orderId: new FormControl(''),
    clientId: new FormControl(''),
    side: new FormControl(''),
    type: new FormControl(''),
    status: new FormControl(''),
    securityId: new FormControl(''),
    entryDateFrom: new FormControl(''),
    entryDateTo: new FormControl(''),
    dateOperator: new FormControl('eq')
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

  //details page
  selectedOrder: Order;
  executions: Execution[] = [];

  constructor(private httpClient: HttpClient, private pagerService: PagerService, private loaderService: LoaderService) { }

  getOrders() {
    this.showLoader();
    let filter = new HttpParams();
    let orderFilter: OrderFilter = this.getOrderFilter(this.searchForm.value);
    orderFilter.dateOperator = this.dateOperator;
    orderFilter.pageCount = this.pageCount;
    orderFilter.pageSize = this.pageSize;
    filter = filter.append("filter", JSON.stringify(orderFilter));
    return this.httpClient.get<Order[]>(this.ORDERS_URL, { params: filter }).subscribe(
      res => {
        this.orders = res
        this.hideLoader();
      }
    );
  }

  getOrdersTotalCount() {
    let filter = new HttpParams();
    let orderFilter: OrderFilter = this.getOrderFilter(this.searchForm.value);
    orderFilter.dateOperator = this.dateOperator;
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
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    if (this.pager.currentPage === page) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalRecords, page, this.pageSize);
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
      filter.entryDateFrom = this.formatDate(formValue.entryDateFrom);
    }
    if (formValue.entryDateTo != '') {
      filter.entryDateTo = this.formatDate(formValue.entryDateTo);
    }
    return filter;
  }

  formatDate(d) {
    var yyyy = d.year.toString();
    var mm = (d.month + 100).toString().slice(-2);
    var dd = (d.day + 100).toString().slice(-2);
    return yyyy + mm + dd;
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }


}
