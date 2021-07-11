import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    MatDialogModule
  ]
})
export class OrderModule { }
