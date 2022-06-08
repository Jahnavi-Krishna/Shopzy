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
  total: any = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("1");
    console.log("2");
    this.http.post<any>("http://localhost:3000/products/in", {}, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      this.products = response.products;
      this.getItems();
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

  getItems(): void {
    this.http.post<any>("http://localhost:3000/cart/in", { email: localStorage.getItem("userEmail") }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response.items);
      this.items = response.items;
      this.total = 0;
      for(var i=0; i< this.items.length; i++) {
        this.total += this.getProduct(this.items[i].productId).price * this.items[i].count;
      }
    });
  }

  addToCart(productId: string): void {
    this.http.post<any>("http://localhost:3000/add-to-cart/in", { email: localStorage.getItem("userEmail"), productId: productId }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      this.getItems();
    });
  }

  subtractFromCart(productId: string): void {
    this.http.post<any>("http://localhost:3000/subtract-from-cart/in", { email: localStorage.getItem("userEmail"), productId: productId }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      this.getItems();
    });
  }

  removeFromCart(productId: string): void {
    this.http.post<any>("http://localhost:3000/remove-from-cart/in", { email: localStorage.getItem("userEmail"), productId: productId }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      this.getItems();
    });
  }

  close() {
    (<HTMLInputElement>document.getElementById("overlay")).style.display = "none";
  }
}
