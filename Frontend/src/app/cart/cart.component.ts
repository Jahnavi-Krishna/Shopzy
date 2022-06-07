import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any = [];
  products: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("1");
    this.http.post<any>("http://localhost:3000/cart/in", { id: "629d8a3a3e8818d4fae68385" }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response.items);
      this.items = response.items;
      console.log("3");
    });
    console.log("2");
    this.http.post<any>("http://localhost:3000/products/in", {}, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      this.products = response.products;
      console.log("4");
    });
  }

  getProduct(productId: string): any {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i]._id === productId) {
        return this.products[i];
      }
    }
    return "None";
  }

  close() {
    (<HTMLInputElement>document.getElementById("overlay")).style.display = "none";
  }

  subtractFromCart(): void {

  }

  addToCart(productId: string): void {
    this.http.post<any>("http://localhost:3000/add-to-cart/in", { id: "629d8a3a3e8818d4fae68385", productId: productId }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
    });
  }
}
