import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import * as moment from 'moment'
import { OrderFilter } from './order-filter.model';
import { LoaderService } from '../utilities/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  ORDERS_URL = "api/orders";
  ORDERS_TOTAL_COUNT_URL = "api/orders/totalcount";

  constructor(private httpClient: HttpClient) { }

  getOrders(formValue, dateOperator, pageSize, pageCount) : Observable<Order[]>  {
    let filter = new HttpParams();
    let orderFilter : OrderFilter = this.getOrderFilter(formValue);
    orderFilter.dateOperator = dateOperator;
    orderFilter.pageCount = pageCount;
    orderFilter.pageSize = pageSize;
    filter = filter.append("filter", JSON.stringify(orderFilter));
    return this.httpClient.get<Order[]>(this.ORDERS_URL, {params: filter });
  }

  getOrdersTotalCount(formValue, dateOperator) : Observable<number>  {
    let filter = new HttpParams();
    let orderFilter : OrderFilter = this.getOrderFilter(formValue);
    orderFilter.dateOperator = dateOperator;
    filter = filter.append("filter", JSON.stringify(orderFilter));
    return this.httpClient.get<number>(this.ORDERS_TOTAL_COUNT_URL, {params: filter });
  }

  getOrderFilter(formValue: any) : OrderFilter {
    let filter : OrderFilter = new OrderFilter();
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


}
