import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/_models/Order';
import { OrderService } from 'src/app/_services/order.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-checkout-final',
  templateUrl: './checkout-final.component.html',
  styleUrls: ['./checkout-final.component.css'],
})
export class CheckoutFinalComponent implements OnInit {
  order: Order | undefined;
  idOrder: string = '';
  item: string = '';
  isLoggedIn = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.item = this.tokenStorage.getOrder();
      console.log(this.item);
      if (this.item) {
        this.idOrder = this.tokenStorage.getOrder()._id;
        this.orderService.getOrderSpecific(this.idOrder).subscribe((data) => {
          this.order = data;
          console.log(data);
        });
      } else {
        window.location.href = 'order';
      }
    } else {
      this.router.navigate(['signin']);
    }
  }

  cancel(): void {
    this.tokenStorage.deleteOrder();
    this.router.navigate(['order']);
  }

  submit(): void {
    this.orderService.updateStatusOrderDatabase().subscribe((data) => {
      console.log('Status berhasil di Update!');
    });
    this.tokenStorage.deleteOrder();
    setTimeout(() => {
      window.location.href = 'order';
    }, 1000);
    // this.router.navigate(['order']);
  }
}
