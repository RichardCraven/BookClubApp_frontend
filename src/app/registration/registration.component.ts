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
    name: '',
    favorite_books : <any> ''
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
        this.registrationData.favorite_books = '';
      }
    });
  }
  post (){
    var favorites = this.registrationData.favorite_books;
    var pointer = 0;
    var arr= [];
    //code to parse through the registration.favorite_books and eleminate empty spaces and add each comma seperated to an array
    if(favorites.length){
      for(var i = 0; i < favorites.length; i++){
        if(favorites[i] === ','){
          arr.push(favorites.slice(pointer,i))
          pointer = i+1
        }
      }
      console.log(arr);      
      // this.registrationData.favorite_books = arr;
    }

    // return
    this.authService.registerUser(this.registrationData)
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();  
  }

  ngOnInit() {
  }

}

