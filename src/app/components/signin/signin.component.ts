import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  token: string | null = '';
  roles: string = '';
  username: string = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      this.router.navigate(['product']);
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    console.log(email);
    console.log(password);
    this.authService.login(email, password).subscribe(
      (res) => {
        const token = res.token;
        this.token = token;
        this.tokenStorage.saveToken(token);
        this.tokenStorage.saveUser(res);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().user.role;
        this.username = this.tokenStorage.getUser().user.username;
        console.log(res);
        console.log(this.roles);
        console.log(!!this.tokenStorage.getToken());
        setTimeout(() => {
          this.reloadPage();
        }, 3000);
        // this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
    // window.location.reload();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
