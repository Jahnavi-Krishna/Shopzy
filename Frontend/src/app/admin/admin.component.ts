import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
    showProducts() {
      (<HTMLInputElement>document.getElementById("products")).style.display = "block";
      (<HTMLInputElement>document.getElementById("feedbacks")).style.display = "none";
      (<HTMLInputElement>document.getElementById("orders")).style.display = "none";
    }

  showFeedback() {
    (<HTMLInputElement>document.getElementById("products")).style.display = "none";
    (<HTMLInputElement>document.getElementById("feedbacks")).style.display = "block";
    (<HTMLInputElement>document.getElementById("orders")).style.display = "none";
  }

  showOrders(){
    (<HTMLInputElement>document.getElementById("products")).style.display = "none";
    (<HTMLInputElement>document.getElementById("feedbacks")).style.display = "none";
    (<HTMLInputElement>document.getElementById("orders")).style.display = "block";
  }
}
