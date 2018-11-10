import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { PagerService } from './pager/pager.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[NgbModule, HttpClientModule, FormsModule, ReactiveFormsModule, LoaderComponent],
  declarations: [LoaderComponent],
  providers: [LoaderService, PagerService]
})
export class UtilitiesModule { }
