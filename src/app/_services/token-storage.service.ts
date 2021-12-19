import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ITEM_KEY = 'item-key';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveOrder(order: any): void {
    window.localStorage.removeItem(ITEM_KEY);
    window.localStorage.setItem(ITEM_KEY, JSON.stringify(order));
  }

  public getOrder(): any {
    const order = window.localStorage.getItem(ITEM_KEY);
    if (order) {
      return JSON.parse(order);
    }

    return null;
  }

  public deleteOrder(): void {
    window.localStorage.removeItem(ITEM_KEY);
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
