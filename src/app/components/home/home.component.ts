import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  // ngOnInit(): void {
  //   this.userService.getPublicContent().subscribe({
  //     next: (data) => {
  //       this.content = data;
  //       console.log(JSON.parse(data).data);
  //     },
  //     error: (err) => {
  //       this.content = JSON.parse(err.error).message;
  //     },
  //   });
  // }
  ngOnInit(): void {}
}
