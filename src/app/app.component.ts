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
  
  constructor(public authService: AuthService) { 
    // this.subscription = this.authService.getMessage().subscribe(data => { 

    // });
  }

  ngOnInit(){
    if(this.authService.isAuthenticated){
      this.authService.setUser();
    }
    console.log('app inited');
  }
  
}
