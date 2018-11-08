import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionsComponent } from './executions.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule
  ],
  declarations: [ExecutionsComponent]
})
export class ExecutionsModule { }
