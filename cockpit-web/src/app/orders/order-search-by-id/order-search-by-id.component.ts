import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { OrdersService } from '../orders.service';
import { LoaderService } from 'src/app/utilities/loader/loader.service';

@Component({
  selector: 'app-order-search-by-id',
  templateUrl: './order-search-by-id.component.html',
  styleUrls: ['./order-search-by-id.component.scss']
})
export class OrderSearchByIdComponent implements OnInit {

  orderId: string;

  constructor(private route: ActivatedRoute, public ordersService: OrdersService, 
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.show();
    console.log()
    this.route.params.subscribe(
      params => {
        console.log(params.id);
        this.orderId = params.id;
        this.ordersService.getOrderById(this.orderId);
        this.loaderService.hide();
      }
    )
    console.log(this.orderId);
   
  }

}
