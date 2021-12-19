import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  form: any = {
    receiveName: null,
    address: null,
  };
  item: string = '';
  isLoggedIn = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.item = this.tokenStorage.getOrder();
      console.log(this.item);
      if (this.item) {
        return;
      } else {
        window.location.href = 'order';
      }
    } else {
      this.router.navigate(['signin']);
    }
  }

  onSubmit(): void {
    const { receiveName, address } = this.form;
    console.log(receiveName, address);
    this.orderService
      .updateAddressOrderDatabase(receiveName, address)
      .subscribe((data) => {
        console.log('Data Berhasil di Update');
        // this.router.navigate(['checkout-final']);
        setTimeout(() => {
          window.location.href = 'checkout-final';
        }, 1000);
      });
  }
}
