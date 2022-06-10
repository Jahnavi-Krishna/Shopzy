import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { CartComponent } from '../cart/cart.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {



  constructor(public dialogService: DialogService, public http: HttpClient, public api: ApiService) { }

  ngOnInit(): void {
    this.api.getProducts();
    this.api.getItems();
    this.api.getFeedbacks();
    if(localStorage.getItem('role') === 'ADMIN') {
      (<HTMLInputElement>document.getElementById("admin")).style.display = "block";
    }
  }

  show() {
    (<HTMLInputElement>document.getElementById("overlay")).style.display = "block";
  }

  itemCount() : any{
    this.http.post<any>("http://localhost:3000/cart/in", { id: localStorage.getItem("userId") }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response.items);
      var count = 0;
      for(var i=0; i< response.items.length; i++){
        count = count + response.items[i].count;
      }
      return count;
    });
    return 0;
  }
}
