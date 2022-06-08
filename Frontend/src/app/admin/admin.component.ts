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

  showFeedback(){
    this.http.get<any>("http://localhost:3000/feedback/all").subscribe((response) => {
      console.log(response);
  });
}

}
