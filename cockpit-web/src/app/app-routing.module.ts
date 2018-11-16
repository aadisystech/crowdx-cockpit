import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ExecutionsComponent } from './executions/executions.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderSearchByIdComponent } from './orders/order-search-by-id/order-search-by-id.component';
import { ExecutionSearchByIdComponent } from './executions/execution-search-by-id/execution-search-by-id.component';

const routes: Routes = [
  {path: '', redirectTo: 'orders', pathMatch: 'full'},
  {path: "orders", component: OrdersComponent}, 
  {path: "orders/:id", component: OrderSearchByIdComponent},
  {path: "order-details/:id", component: OrderDetailsComponent},
  {path: "executions", component: ExecutionsComponent},
  {path: "executions/:id", component: ExecutionSearchByIdComponent},
  {path: "instruments", component: InstrumentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
