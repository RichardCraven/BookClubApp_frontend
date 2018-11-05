import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-messages',
  template: `
    <div *ngFor="let message of apiService.messages">
    <mat-card>{{message.msg}}</mat-card>
  </div>
  `
})
export class MessagesComponent implements OnInit {
  messages = [];
  constructor(private apiService : ApiService, private route:ActivatedRoute) { }

  ngOnInit() {
    // var id = this.route.snapshot.params.id
    var userId = this.route.snapshot.params.id 
    // var userId = '5bce83f2d45bfe4b3d507809'
    console.log('in messages getting user Id: ', userId);
    

    this.apiService.getMessages(userId);
    console.log('messages are ', this.messages);
    
  }

}


