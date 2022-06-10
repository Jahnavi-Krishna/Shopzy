import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  feedback: any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

  searchFeedbacks() {
    this.api.searchFeedbacks((<HTMLInputElement>document.getElementById("searchUser")).value);
  }

}
