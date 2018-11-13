import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  postMsg = ''
  constructor(private apiService: ApiService) { }

  post(){
    // console.log(localStorage);
    
    // localStorage
    this.apiService.postMessages({msg: this.postMsg})
    
  }
}