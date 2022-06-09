import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

  close() {
    (<HTMLInputElement>document.getElementById("overlay")).style.display = "none";
  }
}
