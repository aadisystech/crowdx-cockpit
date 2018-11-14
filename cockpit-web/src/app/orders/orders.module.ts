import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgTempusdominusBootstrapModule } from 'ngx-tempusdominus-bootstrap';
import { UtilitiesModule } from '../utilities/utilities.module';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    UtilitiesModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgTempusdominusBootstrapModule
  ],
  declarations: [OrdersComponent, OrderDetailsComponent]
})
export class OrdersModule { }
