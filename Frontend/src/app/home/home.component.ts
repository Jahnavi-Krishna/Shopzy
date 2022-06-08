import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post<any>("http://localhost:3000/products/in",{}, {headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      this.products = response.products;
      });
  }

  addToCart(productId : string) : void {
    this.http.post<any>("http://localhost:3000/add-to-cart/in",{email: localStorage.getItem("userEmail"), productId: productId}, {headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
  });
} 
}
