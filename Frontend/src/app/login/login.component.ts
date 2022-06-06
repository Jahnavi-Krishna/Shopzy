import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedValues: string[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submit(){
    var username = (<HTMLInputElement>document.getElementById("username")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    console.log(username, password);
    
  }
}
