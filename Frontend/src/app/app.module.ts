import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {CheckboxModule} from 'primeng/checkbox';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { CartComponent } from './cart/cart.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    CartComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CheckboxModule,
    DynamicDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
