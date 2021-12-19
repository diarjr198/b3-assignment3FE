import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/_models/Cart';
import { Product } from 'src/app/_models/Product';
import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

const ITEM_KEY = 'item_key';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  idProduct: string[] = [];
  products: Product[] = [];
  cartDB: Cart[] = [];
  value: number = 1;
  cart: string[] = [];
  check: string[] = [];
  isLoggedIn = false;
  total: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private cartService: CartService,
    private route: Router,
    private tokenStorage: TokenStorageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.cartService.getCartDatabase().subscribe((data) => {
        this.cartDB = data;
        console.log(data);
        console.log(this.cartDB);
      });
    } else {
      this.route.navigate(['signin']);
    }
  }

  inc(amount: string, price: number | undefined): void {
    this.value++;
    this.total = this.value * price!;
    console.log(this.total);
  }

  dec(amount: string, price: number | undefined): void {
    if (this.value > 1) {
      this.value--;
    } else {
      this.value = 1;
    }
    this.total = this.value * price!;
    console.log(parseInt(amount));
  }

  deleteCart(id: string): void {
    this.cartService.deleteCartDatabase(id).subscribe((data) => {
      window.location.reload();
    });
  }

  checkout(
    id: string,
    product: string | undefined,
    amount: string,
    total: number | undefined
  ): void {
    this.orderService
      .addOrderDatabase(product!, parseInt(amount), total!)
      .subscribe((data) => {
        this.tokenStorage.saveOrder(data);
        console.log('Order berhasil ditambahkan!');
      });
    this.cartService.deleteCartDatabase(id).subscribe((data) => {
      // window.location.reload();
      console.log('Cart berhasil dihapus!');
      setTimeout(() => {
        window.location.href = 'checkout';
      }, 500);
    });
  }

  ngOnDestroy() {
    // this.products.forEach((product) => product.unsubscribe());
  }
}
