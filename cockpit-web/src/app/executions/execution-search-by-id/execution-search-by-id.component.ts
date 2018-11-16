import { Component, OnInit } from '@angular/core';
import { ExecutionsService } from '../executions.service';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/utilities/loader/loader.service';

@Component({
  selector: 'app-execution-search-by-id',
  templateUrl: './execution-search-by-id.component.html',
  styleUrls: ['./execution-search-by-id.component.scss']
})
export class ExecutionSearchByIdComponent implements OnInit {

  executionId: string;

  constructor(private route: ActivatedRoute, public executionsService: ExecutionsService,
     private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.show();
    console.log()
    this.route.params.subscribe(
      params => {
        console.log(params.id);
        this.executionId = params.id;
        this.executionsService.getExecutionById(this.executionId);
        this.loaderService.hide();
      }
    )
    console.log(this.executionId);
  }

}
