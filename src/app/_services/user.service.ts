import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../_models/Product';

const API_URL = environment.API_URL + 'api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'product', { responseType: 'text' });
  // }
  getPublicContent(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + 'product');
  }

  getPublicContentSpecific(id: string): Observable<Product> {
    return this.http.get<Product>(API_URL + 'product/' + id);
  }
}
