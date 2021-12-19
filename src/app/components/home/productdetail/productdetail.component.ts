import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/Product';
import { CartService } from 'src/app/_services/cart.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  id: string = '';
  products: Product = {};
  isActive = false;
  isLoggedIn = false;
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenStorage: TokenStorageService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.route.params.subscribe((params) => {
      // console.log(params); //log the entire params object
      // console.log(params['id']); //log the value of id
      this.id = params['id'];
    });
    this.userService.getPublicContentSpecific(this.id).subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  addToCart(item: string | undefined): void {
    if (this.isLoggedIn) {
      this.cartService.addCartDatabase(item!).subscribe(
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
    }
  }
}
