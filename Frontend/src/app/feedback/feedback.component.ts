import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { DataService } from '../data.service';
// import { WebService } from '../web.service';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  public feedbackGiven: boolean = false;
  public logedIn: boolean = true;
  public role: boolean = false;
  public opted: boolean = false;
  feedBack: { [index: string]: any } = {}
  ask: any;

  constructor(private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    // this.data.currentStatus.subscribe(msg => this.logedIn = msg);
    // this.data.currentlogin.subscribe(msg => this.role = msg);
    this.ask = setInterval(() => {
      if (this.logedIn && !this.opted && !this.role) {
        document.getElementById('pop01')!.style.display = 'block';
      }
    }, 20000);
  }
  giveFeedback() {
    document.getElementById('pop01')!.style.display = 'block';
  }
  pop1Sel(ans: string) {
    this.opted = true;
    if (ans === 'y') {
      this.feedBack["Liked"] = "Yes";
      document.getElementById('pop02')!.style.display = 'block';
    } else {
      this.feedBack["Liked"] = "No";
      document.getElementById('pop04')!.style.display = 'block';
    }
    document.getElementById('pop01')!.style.display = 'none';
  }
  next(str: string) {
    this.feedBack["Points"] = [];
    for (var i = 0; i < 5; i++) {
      var e = (<HTMLInputElement>document.getElementById(`pop-chk-${str}${i}`));
      if (e.checked) {
        this.feedBack['Points'].push(e.value);
      }
    }
    var r = (<HTMLInputElement>document.getElementById(`rating-${str}`));
    this.feedBack["Ratings"] = r.value;
    document.getElementById('pop03')!.style.display = "block";
    document.getElementById('pop02')!.style.display = "none";
    document.getElementById('pop04')!.style.display = "none";
  }
  submit() {
    var msg = (<HTMLInputElement>document.getElementById('feedback-msg')).value;
    this.feedBack["Message"] = msg;
    this.feedBack["DateTime"] = Date();
    document.getElementById('pop03')!.style.display = "none";
    console.log(this.feedBack);
    this.http.post<any>("http://localhost:3000/feedback/in", { "userEmail": localStorage.getItem("userEmail"), "feedback": this.feedBack}, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
    });
      //   this.web.submitFeed(this.feedBack, Number(localStorage.getItem('user'))).subscribe((data) => {
      //     if(data.msg === "Successful!"){
      //       Swal.fire('Thank you','Feedback Recorded Succesfully!','success');
      //       this.feedbackGiven = true;
      //       document.getElementById('feedback-con')!.style.display = 'none';
      //       clearInterval(this.ask);
      //     }
      //   })
    }
}