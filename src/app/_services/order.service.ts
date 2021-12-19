import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/Order';
import { TokenStorageService } from './token-storage.service';

const API_URL = environment.API_URL + 'api/';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: Order | undefined;
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService
  ) {}

  addOrderDatabase(
    product: string,
    amount: number,
    total: number
  ): Observable<Order> {
    const user = this.tokenStorage.getUser().user.id;
    return this.http.post<Order>(API_URL + 'order/create', {
      product,
      user,
      amount,
      total,
    });
  }

  updateAddressOrderDatabase(
    receiveName: string,
    address: string
  ): Observable<Order> {
    const id = this.tokenStorage.getOrder()._id;
    const status = 'Menunggu Pembayaran';
    return this.http.put<Order>(API_URL + 'order/update/' + id, {
      receiveName,
      address,
      status,
    });
  }

  updateStatusOrderDatabase(): Observable<Order> {
    const id = this.tokenStorage.getOrder()._id;
    const status = 'Pembayaran sedang diverifikasi';
    return this.http.put<Order>(API_URL + 'order/updateStatus/' + id, {
      status,
    });
  }

  getOrderUser(): Observable<Order[]> {
    const id = this.tokenStorage.getUser().user.id;
    return this.http.get<Order[]>(API_URL + 'order/user/' + id);
  }

  getOrderSpecific(id: string): Observable<Order> {
    return this.http.get<Order>(API_URL + 'order/' + id);
  }
}
