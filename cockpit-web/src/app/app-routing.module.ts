import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ExecutionsComponent } from './executions/executions.component';
import { InstrumentsComponent } from './instruments/instruments.component';

const routes: Routes = [
  {path: "orders", component: OrdersComponent},
  {path: "executions", component: ExecutionsComponent},
  {path: "instruments", component: InstrumentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
