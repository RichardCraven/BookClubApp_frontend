import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private authService: AuthService) { }

  profile

  ngOnInit() {
    var id = this.route.snapshot.params.id
    this.apiService.getProfile(id).subscribe((data) => {
      this.profile = data
      console.log(data)
    })
    
    
  }
  addFriend(){
    //this.profile._id refers to the person youre adding
    this.apiService.addFriend({id: this.profile._id})
  }

}
