import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  feedback: any;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>("http://localhost:3000/feedback/all").subscribe((response) => {
      console.log(response);
      this.feedback = response.data;
    });
  }

}
