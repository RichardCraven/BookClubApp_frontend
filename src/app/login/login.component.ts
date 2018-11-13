import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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
  message: any;
  subscription: Subscription;

  constructor(private authService: AuthService) { 
    this.subscription = this.authService.getMessage().subscribe(data => { 
      if(data.message == 'clear-fields'){
        this.loginData.email = '';
        this.loginData.pwd = '';
      }
    });
  }
  login() {
    this.authService.loginUser(this.loginData)
  }

  ngOnInit() {
  }
}
