import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedValues: string[] = [];
  public remember = false;
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    var email = localStorage.getItem("email");
    if(email != null) {
      (<HTMLInputElement>document.getElementById("email")).value = email;
    }
    var password = localStorage.getItem("password");
    if(password != null) {
      (<HTMLInputElement>document.getElementById("password")).value = password;
    }
  }

  submit(){
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    console.log(email, password);
    this.http.post<any>("http://localhost:3000/login/in",{"email": email,"pwd": password}, {headers: {'Content-Type':"application/json"}}).subscribe((response) => {
      console.log(response);
      if(response.error == null){
        console.log(this.remember);
        if(this.remember) {
          console.log("saved");
          localStorage.setItem("email",email);
          localStorage.setItem("password",password);
        }
        localStorage.setItem("userEmail", email);
        localStorage.setItem("role",response.role);
        this.router.navigate(['/home']);
      }
      else {
        alert(response.error);
      }
    });

    
  }
}
