import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public items: any;
  public productsAll: any;
  public products: any;
  public total: any;
  public count: any;
  public category: any = [];
  public feedbacksAll: any;
  public feedbacks: any;
  public orders: any;

  constructor(private http: HttpClient) { }

  getProducts() {
    this.http.post<any>("http://localhost:3000/products/in", {}, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      this.productsAll = response.products;
      this.products = this.productsAll;
      for (var i = 0; i < this.productsAll.length; i++) {
        var j = 0;
        for (j = 0; j < this.category.length; j++) {
          if (this.productsAll[i].type == this.category[j]) {
            break;
          }
        }
        if (j == this.category.length) {
          this.category.push(this.productsAll[i].type)
        }
      }
    });
  }

  getItems() {
    this.http.post<any>("http://localhost:3000/cart/in", { email: localStorage.getItem("userEmail") }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      if (response == null) {
        this.items = [];
      }
      else { this.items = response.items; }
      this.total = 0;
      this.count = 0;
      for (var i = 0; i < this.items.length; i++) {
        this.total += this.getProduct(this.items[i].productId).price * this.items[i].count;
        this.count += this.items[i].count;
      }
    });
  }

  getFeedbacks(): void {
    this.http.get<any>("http://localhost:3000/feedback/all").subscribe((response) => {
      console.log(response);
      this.feedbacksAll = response.data;
      this.feedbacks = this.feedbacksAll;
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

  getProduct(productId: string) {
    if (this.productsAll == null) {
      return "None";
    }
    for (var i = 0; i < this.productsAll.length; i++) {
      if (this.productsAll[i]._id === productId) {
        return this.productsAll[i];
      }
    }
    return "None";
  }

  searchProducts(product: string) {
    this.products = [];
    for (var i = 0; i < this.productsAll.length; i++) {
      if ((this.productsAll[i].name.toLowerCase()).match(".*" + product.toLowerCase() + ".*")) {
        this.products.push(this.productsAll[i]);
      }
    }
  }

  searchFeedbacks(email: string) {
    this.feedbacks = [];
    for (var i = 0; i < this.feedbacksAll.length; i++) {
      if ((this.feedbacksAll[i].email.toLowerCase()).match(".*" + email.toLowerCase() + ".*")) {
        this.feedbacks.push(this.feedbacksAll[i]);
      }
    }
  }

  sortProducts(reverse: boolean) {
    for (var i = 0; i < this.products.length; i++) {
      for (var j = 0; j < this.products.length - 1; j++) {
        if ((!reverse && parseInt(this.products[j].price) > parseInt(this.products[j + 1].price)) || (reverse && parseInt(this.products[j].price) < parseInt(this.products[j + 1].price))) {
          var t = this.products[j];
          this.products[j] = this.products[j + 1];
          this.products[j + 1] = t;
        }
      }
    }
  }

  filterProducts(type: any) {
    console.log(type);
    if (type.length == 0) {
      this.products = this.productsAll;
    }
    else {
      var temp = [];
      for (var i = 0; i < this.productsAll.length; i++) {
        for (var j = 0; j < type.length; j++) {
          if (this.productsAll[i].type == type[j]) {
            temp.push(this.productsAll[i]);
          }
        }
      }
      this.products = temp;
      console.log(this.products);
    }
  }

  deleteProduct(productId: string) {
    this.http.post("http://localhost:3000/deleteProduct/in", { productId: productId }, { headers: { 'Content-Type': 'application/json' } }).subscribe((respons) => {
      this.getProducts();
    });
  }

  addProduct(name: string, price: string, type: string, desc: string) {
    this.http.post("http://localhost:3000/addProduct/in", { name: name, price: price, type: type, desc: desc }, { headers: { 'Content-Type': 'application/json' } }).subscribe((respons) => {
      this.getProducts();
    })
  }

  updateProduct(productId: string, name: string, price: string, type: string, desc: string) {
    this.http.post("http://localhost:3000/updateProduct/in", { _id: productId, name: name, price: price, type: type, desc: desc }, { headers: { 'Content-Type': 'application/json' } }).subscribe((respons) => {
      this.getProducts();
    })
  }

  checkout() {
    this.http.post("http://localhost:3000/createOrder/in", { email: localStorage.getItem('userEmail') }, { headers: { 'Content-Type': 'application/json' } }).subscribe((responses) => {
      this.getItems();
      alert('Ordered');
    })
  }

  getOrders() {
    this.http.post<any>("http://localhost:3000/showOrders/in", {}, { headers: { 'Content-Type': 'application/json' } }).subscribe((response) => {
      console.log(response.data);
      this.orders = response.data;
    })
  }

  clearProducts() {
    this.products = this.productsAll;
  }
}
