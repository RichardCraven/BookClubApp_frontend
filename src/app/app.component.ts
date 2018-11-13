import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookClub';
  componentMessage: any;
  subscription: Subscription;
  isAdmin;
  // user;
  constructor(public authService: AuthService) { 
    this.subscription = this.authService.getMessage().subscribe(data => { 
      if(data.message == 'isAdmin'){
        console.log('setting admin to TRUE');
        this.isAdmin = true;
      } else if(data.message == 'isNotAdmin'){
        console.log('setting admin to false');
        this.isAdmin = false;
      }
    });
  }

  ngOnInit(){
    if(this.authService.isAuthenticated){
      this.authService.checkAdminPrivileges();
    }
    console.log('app inited');
  }
  
}
