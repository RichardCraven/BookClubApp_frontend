import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'users',
  template: `
    <div *ngFor="let user of apiService.users; let i = index">
    <div class='user-tab-container'>
      <mat-card class='userCardTab' (click)='expandCard(i)' style='cursor: pointer;' >{{user.name}}</mat-card>
      <mat-card class='user-active-token'> Last Active <br> <span> Sometime </span> </mat-card>
      <mat-card class='connection-token'> Connect </mat-card>
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
  users = [];
  expandedIndex : Number;
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUsers();
  }
  expandCard(i){
    console.log('expanding card', i);
    if(this.expandedIndex === i) this.expandedIndex = null; else this.expandedIndex = i;
    
    
  }

}
