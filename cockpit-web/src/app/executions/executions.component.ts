import { Component, OnInit } from '@angular/core';
import { ExecutionsService } from './executions.service';
import { PagerService } from '../utilities/pager/pager.service';
import { LoaderService } from '../utilities/loader/loader.service';

@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent implements OnInit {

  isDateValid = true;

  options = {
    format: "DD-MM-YYYY HH:mm:SS",
    buttons: { showClose: true }, icons: { clear: 'fa fa-trash' }
  };

  constructor(private executionsService: ExecutionsService) { }

  ngOnInit() {    
  }

  getExecutions() {
    this.executionsService.getExecutions();
    this.executionsService.getExecutionsTotalCount();
  }

  checkToDate() {
    console.log('checkToDate called');
    if (this.executionsService.searchForm.get("createDateFrom")) {
      let toDate = this.executionsService.searchForm.get("createDateTo").value;
      if (toDate.isBefore(this.executionsService.searchForm.get("createDateFrom").value)) {
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
    if (this.executionsService.searchForm.get("createDateTo")) {
      let fromDate = this.executionsService.searchForm.get("createDateFrom").value;
      if (fromDate.isAfter(this.executionsService.searchForm.get("createDateTo").value)) {
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
