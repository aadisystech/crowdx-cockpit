import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionsComponent } from './executions.component';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  imports: [
    CommonModule,
    UtilitiesModule
  ],
  declarations: [ExecutionsComponent]
})
export class ExecutionsModule { }
