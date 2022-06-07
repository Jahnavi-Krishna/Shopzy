import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService]
})
export class HeaderComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }

  show() {
    (<HTMLInputElement>document.getElementById("overlay")).style.display = "block";
}
}
