import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users',
  template: `
    <div *ngFor="let user of apiService.users; let i = index">
      <div class='user-tab-container' *ngIf='user._id !== loggedInUserId'>
        <mat-card class='userCardTab' (click)='expandCard(i)' style='cursor: pointer;' >{{user.name}}</mat-card>
        <mat-card class='user-active-token'> Last Active <br> <span> Sometime </span> </mat-card>
        <mat-card class='connection-token' (click)='requestConnection(i)'> Connect </mat-card>
      </div>
      <mat-card class='userCardExpanded' *ngIf='expandedIndex === i'>
        Currently reading: {{user.name}} <br> <br>
        Reviews <br> <br>
        Bio: {{user.description}}
      </mat-card>
    </div>
  `,
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  componentMessage: any;
  subscription: Subscription;
  users = [];
  loggedInUserId;
  expandedIndex : Number;
  constructor(public apiService: ApiService, public authService: AuthService) {
    this.subscription = this.authService.getId().subscribe(data => { 
      console.log('huzzah! id is', data.id)
      this.loggedInUserId = data.id;
      // if(data.id == 'id_transfer'){
      //   console.log('setting admin to TRUE');
      // } 
    });
  }

  ngOnInit() {
    this.apiService.getUsers()
    // console.log(this.apiService.users)
    // this.users = this.apiService.users;
    // for(var x in this.users){
    //   console.log(this.users[x]._id)
    // }
    if(this.authService.isAuthenticated){
      // this.authService.checkId();
    }
  }
  // isLoggedIn(id){
  //   this.authService.isLoggedIn(id).subscribe(res => {
  //     console.log('is logged in res ', res)
  //   })
  // }
  expandCard(i){
    console.log('expanding card', i);
    if(this.expandedIndex === i) this.expandedIndex = null; else this.expandedIndex = i;
  }
  requestConnection(i){
    //this.profile._id refers to the person youre adding
    console.log(this.apiService.users[i]._id)
    this.apiService.requestConnection({id: this.apiService.users[i]._id})
  }
}
