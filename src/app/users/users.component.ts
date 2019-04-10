import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
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
    var user_id = this.apiService.users[i]._id
    this.apiService.requestConnection({id: user_id})
    this.authService.outboundRequestList.push(user_id)
  }
}
