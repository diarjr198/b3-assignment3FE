import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.API_URL + 'api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: object }>(
      AUTH_API + 'signin',
      { email, password }
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ data: object }>(AUTH_API + 'signup', {
      username,
      email,
      password,
    });
  }
}
