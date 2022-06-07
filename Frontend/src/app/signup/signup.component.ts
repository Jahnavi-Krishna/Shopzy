import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submit(): void {
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    this.http.post<any>("http://localhost:3000/signup/in", { "email": email, "pwd": password }, { headers: { 'Content-Type': "application/json" } }).subscribe((response) => {
      console.log(response);
      if (response.error == null) {
        this.router.navigate(['/login']);
      }
      else {
        alert(response.error);
      }
    });
  }
}
