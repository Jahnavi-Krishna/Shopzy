import { Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  selectedValues: string[] = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
