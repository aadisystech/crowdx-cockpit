import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagerService } from '../utilities/pager/pager.service';
import { LoaderComponent } from '../utilities/loader/loader.component';
import { LoaderService } from '../utilities/loader/loader.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [OrdersComponent, LoaderComponent],
  providers: [PagerService, LoaderService]
})
export class OrdersModule { }
