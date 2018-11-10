import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ExecutionsService } from './executions.service';
import { PagerService } from '../utilities/pager/pager.service';
import { LoaderService } from '../utilities/loader/loader.service';
import { Execution } from './execution.model';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent implements OnInit {

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
  })

  dateOperators: string[] = ['eq', 'le', 'ge', 'bt'];
  records: number[] = [10, 25, 50, 100];
  pageSize: number = 10;
  pageCount: number = 1;
  dateOperator: string = 'eq';
  executions: Execution[];
  totalRecords: number;
  pager: any = {};

  constructor(private executionsService: ExecutionsService, private pagerService: PagerService, private loaderService: LoaderService) { }

  ngOnInit() {
  }

  getOrders() {
    this.showLoader();
    this.executionsService.getExecutions(this.searchForm.value, this.dateOperator, this.pageSize, this.pageCount).subscribe(
      res => {
        this.executions = res
        this.hideLoader();
      }
    )
    this.executionsService.getExecutionsTotalCount(this.searchForm.value, this.dateOperator).subscribe(
      res => {
        this.totalRecords = res
        this.setPage(1, false);
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
      this.executionsService.getExecutions(this.searchForm.value, this.dateOperator, this.pageSize, this.pageCount).subscribe(
        res => {
          this.executions = res;
          this.hideLoader();
        }
      )
    }
   
  }
  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }

}
