import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationData = {
    email: '',
    pwd: '',
    description: '',
    name: ''
  };
  message: any;
  subscription: Subscription;
  constructor(public authService: AuthService) { 
    this.subscription = this.authService.getMessage().subscribe(data => { 
      if(data.message == 'clear-fields'){
        this.registrationData.email = '';
        this.registrationData.pwd = '';
        this.registrationData.description = '';
        this.registrationData.name = '';
      }
    });
  }
  post (){
    this.authService.registerUser(this.registrationData)
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

  ngOnInit() {
  }

}

