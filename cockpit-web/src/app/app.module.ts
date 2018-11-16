import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersModule } from './orders/orders.module';
import { ExecutionsModule } from './executions/executions.module';
import { InstrumentsComponent } from './instruments/instruments.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdersModule,
    ExecutionsModule,
    FormsModule
  ],
  exports: [
    OrdersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
