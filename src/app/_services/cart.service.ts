import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../_models/Cart';
import { Product } from '../_models/Product';
import { TokenStorageService } from './token-storage.service';
import { UserService } from './user.service';

const ITEM_KEY = 'item_key';
const API_URL = environment.API_URL + 'api/';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  cart: string[] = [];
  idProduct: string[] = [];
  products: Product[] = [];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {}

  addCartSession(item: string): void {
    if (!this.getCartSession()) {
      this.cart.push(item);
      window.sessionStorage.removeItem(ITEM_KEY);
      window.sessionStorage.setItem(ITEM_KEY, JSON.stringify(this.cart));
    } else {
      this.cart = JSON.parse(this.getCartSession());
      this.cart.push(item);
      window.sessionStorage.removeItem(ITEM_KEY);
      window.sessionStorage.setItem(ITEM_KEY, JSON.stringify(this.cart));
    }
  }

  addCartDatabase(item: string) {
    const idUser = this.tokenStorage.getUser().user.id;
    // console.log(idUser);
    return this.http.post<{ product: object; user: object }>(
      API_URL + 'cart/create',
      { product: item, user: idUser }
    );
  }

  getCartDatabase(): Observable<Cart[]> {
    const idUser = this.tokenStorage.getUser().user.id;
    return this.http.get<Cart[]>(API_URL + 'cart/user/' + idUser);
  }

  deleteCartDatabase(id: string): Observable<Cart> {
    console.log(id);
    return this.http.delete<Cart>(API_URL + 'cart/delete/' + id);
  }

  getCartSession(): any {
    return window.sessionStorage.getItem(ITEM_KEY);
  }

  getCartListSession(idProduct: string[]): any {
    for (let i = 0; i < idProduct.length; i++) {
      this.userService
        .getPublicContentSpecific(idProduct[i])
        .subscribe((products) => {
          this.products.push(products);
        });
    }
    return this.products;
  }

  deleteCartSession(id: string): any {
    this.cart = JSON.parse(this.getCartSession());
    const index = this.cart.findIndex((el) => el === id);
    const cartNew = this.cart.splice(index, 1);
    window.sessionStorage.removeItem(ITEM_KEY);
    window.sessionStorage.setItem(ITEM_KEY, JSON.stringify(cartNew));
  }
}
