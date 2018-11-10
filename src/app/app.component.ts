import { Component } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bookClub';
  user;
  constructor(public authService: AuthService) { }

  ngOnInit(){
    console.log('app inited');
    this.user = this.authService.token
  }
  
}
