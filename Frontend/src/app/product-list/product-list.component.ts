import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productId: any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts();
  }

  searchProducts() {
    console.log((<HTMLInputElement>document.getElementById("search")).value);
    this.api.searchProducts((<HTMLInputElement>document.getElementById("search")).value);
  }

  openProduct(){
    (<HTMLInputElement>document.getElementById("popup")).style.display="block";
  }

  closeProduct(){
    (<HTMLInputElement>document.getElementById("popup")).style.display="none";
  }

  save(){
    var name = (<HTMLInputElement>document.getElementById("name")).value;
    var price = (<HTMLInputElement>document.getElementById("price")).value;
    var type = (<HTMLInputElement>document.getElementById("type")).value;
    var desc = (<HTMLInputElement>document.getElementById("desc")).value;
    if(this.productId == null){
      this.api.addProduct(name, price, type, desc);
    }
    else{
      this.api.updateProduct(this.productId,name, price, type, desc);
    }
    this.closeProduct();
  }

  update(product: any){
    this.productId=product._id;
    (<HTMLInputElement>document.getElementById("name")).value = product.name;
    (<HTMLInputElement>document.getElementById("price")).value = product.price;
    (<HTMLInputElement>document.getElementById("type")).value = product.type;
    (<HTMLInputElement>document.getElementById("desc")).value = product.description;
    this.openProduct();
  }

  newProduct() {
    this.productId=null;
    (<HTMLInputElement>document.getElementById("name")).value = "";
    (<HTMLInputElement>document.getElementById("price")).value = "";
    (<HTMLInputElement>document.getElementById("type")).value = "";
    (<HTMLInputElement>document.getElementById("desc")).value = "";
    this.openProduct();
  }

}
