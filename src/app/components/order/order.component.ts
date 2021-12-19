import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/Order';
import { OrderService } from 'src/app/_services/order.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  idOrder: string[] = [];
  orders: Order[] = [];
  isLoggedIn = false;
  constructor(
    private orderService: OrderService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.orderService.getOrderUser().subscribe((data) => {
        this.orders = data;
      });
    } else {
      this.router.navigate(['signin']);
    }
  }

  checkout(id: string): void {
    this.orderService.getOrderSpecific(id).subscribe((data) => {
      this.tokenStorage.saveOrder(data);
      setTimeout(() => {
        window.location.href = 'checkout-final';
      }, 1000);
    });
    // this.router.navigate(['checkout-final']);
  }
}
