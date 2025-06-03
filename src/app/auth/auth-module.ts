import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { AuthRoutingModule } from './auth-routing-module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login-component/login-component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgClass
  ],
  providers: [AuthService],
})
export class AuthModule { }
