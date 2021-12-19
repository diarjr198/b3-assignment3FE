import { Component, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/_models/Product';
import { CartService } from 'src/app/_services/cart.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  products: Product[] = [];
  isLoggedIn = false;
  errorMessage = '';

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.userService.getPublicContent().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  addToCart(item: string): void {
    if (this.isLoggedIn) {
      this.cartService.addCartDatabase(item).subscribe(
        (data) => {
          setTimeout(() => {
            window.location.href = 'cart';
          }, 500);
        },
        (err) => {
          this.errorMessage = err.error.message;
          console.log(this.errorMessage);
        }
      );
    } else {
      setTimeout(() => {
        window.location.href = 'cart';
      }, 500);
    }
  }
}
