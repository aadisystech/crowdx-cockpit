import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSearchByIdComponent } from './order-search-by-id.component';

describe('OrderSearchByIdComponent', () => {
  let component: OrderSearchByIdComponent;
  let fixture: ComponentFixture<OrderSearchByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSearchByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSearchByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
