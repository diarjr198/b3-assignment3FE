import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'front-end';
  private roles: string = '';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    console.log(this.isLoggedIn);

    if (this.isLoggedIn) {
      const user = this.tokenStorage.getUser();
      this.roles = user.user.role;

      this.showAdminBoard = this.roles.includes('ADMIN');
      this.showModeratorBoard = this.roles.includes('MODERATOR');

      this.username = user.user.username;
    }
  }
}
