import { Injectable } from '@angular/core';
import { Execution } from './execution.model';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExecutionFilter } from './execution-filter.model';
import * as moment from 'moment';
import { LoaderService } from '../utilities/loader/loader.service';
import { PagerService } from '../utilities/pager/pager.service';
import { Order } from '../orders/order.model';

@Injectable({
  providedIn: 'root'
})
export class ExecutionsService {

  EXECUTIONS_URL = "api/executions";
  EXECUTIONS_TOTAL_COUNT_URL = "api/executions/totalcount";
  GET_ORDER_FROM_ORDER_ID = "/api/orders/";

  records: number[] = [10, 25, 50, 100];
  pageSize: number = 10;
  pageCount: number = 1;
  totalRecords: number;
  pager: any = {};
  showNoDataFoundAlert: boolean = false;

  searchForm = new FormGroup({
    executionId: new FormControl('', [Validators.minLength(14)]),
    orderId: new FormControl('', [Validators.minLength(14)]),
    type: new FormControl(''),
    createDateFrom: new FormControl(moment(new Date(new Date().setHours(0, 0, 0, 0)))),
    createDateTo: new FormControl(moment(new Date()))
  });

  tableControlForm = new FormGroup({
    pageSize: new FormControl(10),
    pageCount: new FormControl(1)
  });


  executions: Execution[];

  //search by id
  searchedExecution: Execution;
  orderForExecutionId: Order;

  constructor(private httpClient: HttpClient, private loaderService: LoaderService, private pagerService: PagerService) { }

  getExecutions() {
    this.showLoader();
    let filter = new HttpParams();
    let exeFilter: ExecutionFilter = this.getExecutionFilter(this.searchForm.value);
    exeFilter.pageCount = this.pageCount;
    exeFilter.pageSize = this.pageSize;
    filter = filter.append("filter", JSON.stringify(exeFilter));
    return this.httpClient.get<Execution[]>(this.EXECUTIONS_URL, { params: filter }).subscribe(
      res => {
        this.executions = res
        console.log(this.executions);
        if (this.executions.length == 0) {
          this.showNoDataFoundAlert = true;
          setTimeout(() => {
            this.showNoDataFoundAlert = false;
          }, 3000);
        }
        this.hideLoader();
      }
    );
  }

  getExecutionsTotalCount(initial: boolean = true, changePager:boolean = false, page:number = 1) {
    let filter = new HttpParams();
    let exeFilter: ExecutionFilter = this.getExecutionFilter(this.searchForm.value);
    filter = filter.append("filter", JSON.stringify(exeFilter));
    return this.httpClient.get<number>(this.EXECUTIONS_TOTAL_COUNT_URL, { params: filter }).subscribe(
      res => {
        this.totalRecords = res
        if (initial) {
          this.setPage(1);
        }
        if (changePager) {
          this.pager = this.pagerService.getPager(this.totalRecords, page, this.pageSize);
        }
      }
    );
  }

  getExecutionById(executionId: string) {
    this.searchedExecution = undefined;
    this.orderForExecutionId = undefined;
    this.showLoader();
    let filter = new HttpParams();
    let exeFilter: ExecutionFilter = new ExecutionFilter();
    exeFilter.executionId = executionId;
    exeFilter.pageCount = 1;
    exeFilter.pageSize = 1;
    filter = filter.append("filter", JSON.stringify(exeFilter));
    return this.httpClient.get<Order>(this.EXECUTIONS_URL, { params: filter }).subscribe(
      res => {
        if (Array.isArray(res)) {
          if ((<Array<Order>>res).length > 0) {
            this.searchedExecution = res[0]
            this.getOrderForExecutionId();
            console.log("<<>>" + this.searchedExecution.orderId);
          }
        }
        this.hideLoader();
      }
    );
  }

  getOrderForExecutionId() {
    this.showLoader();
    return this.httpClient.get<Order>(this.GET_ORDER_FROM_ORDER_ID + this.searchedExecution.orderId).subscribe(
      res => {
        this.orderForExecutionId = res;
        this.hideLoader();
      }
    )
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.totalRecords, page, this.pageSize);
    this.pageCount = page;
  }

  onPageNumberChange(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pageCount = page;
    this.getExecutions();
    this.getExecutionsTotalCount(false, true, page);
  }

  getExecutionFilter(formValue: any): ExecutionFilter {
    let filter: ExecutionFilter = new ExecutionFilter();
    if (formValue.orderId != '') {
      filter.orderId = formValue.orderId;
    }
    if (formValue.executionId != '') {
      filter.executionId = formValue.executionId;
    }
    if (formValue.type != '') {
      filter.type = formValue.type;
    }
    if (formValue.createDateFrom != '') {
      filter.createDateFrom = formValue.createDateFrom.format("YYYY-MM-DD HH:mm:ss");
    }
    if (formValue.createDateTo != '') {
      filter.createDateTo = formValue.createDateTo.format("YYYY-MM-DD HH:mm:ss");
    }
    return filter;
  }

  onPageSizeChane() {
    console.log(this.pageSize);
    this.pageCount = 1;
    this.getExecutions();
    this.getExecutionsTotalCount();
    //this.pager = this.pagerService.getPager(this.totalRecords, 1, this.pageSize);
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }

}
