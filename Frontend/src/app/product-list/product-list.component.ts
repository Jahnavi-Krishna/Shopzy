import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts();
  }

  searchProducts() {
    console.log((<HTMLInputElement>document.getElementById("search")).value);
    this.api.searchProducts((<HTMLInputElement>document.getElementById("search")).value);
  }
}
