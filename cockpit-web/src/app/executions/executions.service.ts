import { Injectable } from '@angular/core';
import { Execution } from './execution.model';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ExecutionFilter } from './execution-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ExecutionsService {
  
  EXECUTIONS_URL = "api/executions";
  EXECUTIONS_TOTAL_COUNT_URL = "api/executions/totalcount";

  constructor(private httpClient: HttpClient) { }

  getExecutions(formValue, dateOperator, pageSize, pageCount) : Observable<Execution[]>  {
    let filter = new HttpParams();
    let orderFilter : ExecutionFilter = this.getExecutionFilter(formValue);
    orderFilter.dateOperator = dateOperator;
    orderFilter.pageCount = pageCount;
    orderFilter.pageSize = pageSize;
    filter = filter.append("filter", JSON.stringify(orderFilter));
    return this.httpClient.get<Execution[]>(this.EXECUTIONS_URL, {params: filter });
  }

  getExecutionsTotalCount(formValue, dateOperator) : Observable<number>  {
    let filter = new HttpParams();
    let orderFilter : ExecutionFilter = this.getExecutionFilter(formValue);
    orderFilter.dateOperator = dateOperator;
    filter = filter.append("filter", JSON.stringify(orderFilter));
    return this.httpClient.get<number>(this.EXECUTIONS_TOTAL_COUNT_URL, {params: filter });
  }

  getExecutionFilter(formValue: any) : ExecutionFilter {
    let filter : ExecutionFilter = new ExecutionFilter();
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
