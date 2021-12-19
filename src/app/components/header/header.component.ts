import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faSearch,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Cart } from 'src/app/_models/Cart';
import { CartService } from 'src/app/_services/cart.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faUser = faUser;
  show = false;
  user = false;
  isLoggedIn = false;
  cartDB: Cart[] = [];
  cart: string[] = [];
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.cartService.getCartDatabase().subscribe((data) => {
        this.cartDB = data;
      });
    } else {
      this.cart = JSON.parse(this.cartService.getCartSession());
    }
  }

  showBar() {
    if (this.show === false) {
      this.show = true;
    } else {
      this.show = false;
    }
    // this.cartService.getCartSession().subscribe((data: string[]) => {
    //   this.cart = data;
    // });
    console.log(typeof this.cartService.getCartSession());
    console.log(this.cart.length);
  }

  showUserMenu() {
    if (this.user === false) {
      this.user = true;
    } else {
      this.user = false;
    }
  }

  ClickedOut(event: any) {
    // console.log(event);
    // if (event.target.innerText === 'Sign Up' || 'Sign In') {
    this.user = false;
    this.show = false;
    // }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['signin']);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}
