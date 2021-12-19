import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { ProductComponent } from './product/product.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ProductComponent,
    ProductdetailComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, FontAwesomeModule],
})
export class HomeModule {}
