import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'users',
  template: `
    <div *ngFor="let user of apiService.users">
    <mat-card [routerLink]="['/profile', user._id ]" style='cursor: pointer;' >{{user.name}}</mat-card>
  </div>
  `,
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];
  constructor(public apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUsers();
  }

}