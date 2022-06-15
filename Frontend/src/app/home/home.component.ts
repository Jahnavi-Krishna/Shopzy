import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category: any = [];

  sortProducts: any;
  filterProducts: any;


  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.filterProducts = [];
  }

  hoverOn(productId: string): void {
    (<HTMLInputElement>document.getElementById("card-" + productId)).style.transform = "scale(1.2)";
  }

  hoverOff(productId: string): void {
    (<HTMLInputElement>document.getElementById("card-" + productId)).style.transform = "scale(1)";
  }

  searchProducts() {
    console.log((<HTMLInputElement>document.getElementById("search")).value);
    this.api.searchProducts((<HTMLInputElement>document.getElementById("search")).value);
  }

  filter(name: string, isChecked: boolean) {
      if (isChecked) {
        this.category.push(name);
      } else {
        for (var i = 0; i < this.category.length; i++) {
          if (this.category[i] == name) {
            this.category.splice(i, 1);
          }
        }
      }
      this.api.filterProducts(this.category);
  }

  clear() {
    this.sortProducts = null;
    this.category = [];
    this.filterProducts = [];
    this.api.clearProducts();
  }

}
