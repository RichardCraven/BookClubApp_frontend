import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    email: '',
    pwd: ''
  };
  constructor(private authService: AuthService) { }
  login() {
    this.authService.loginUser(this.loginData)
  }

  ngOnInit() {
  }
}
