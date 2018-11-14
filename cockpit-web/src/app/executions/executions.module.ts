import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutionsComponent } from './executions.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    UtilitiesModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    NgTempusdominusBootstrapModule 
  ],
  declarations: [ExecutionsComponent]
})
export class ExecutionsModule { }
