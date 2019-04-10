import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service'
import { AuthService} from '../auth.service'
import { Subscription } from 'rxjs';
import { isDifferent } from '@angular/core/src/render3/util';
import { timeout } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn;
  componentMessage: any;
  subscription: Subscription;
  expandedRequestIndex: Number;
  books = [];
  reviews = [
    {
      book: 'Fear and Loathing in Las Vegas',
      reviewer: 'Dan D.',
      content: 'I liked this book, specifically the drugs and psychadelia. I did think the ending kinda petered out a bit, but I still enjoyed the ride!'
    },
    {
      book: 'Bombs over Baghdad',
      reviewer: 'Jillian Welch',
      content: 'While I did enjoy the overall pace of the book, I found some the the scenes a little too graphic for my tastes. I realize its a dark subject matter, but I feel like it could have been delivered a little bit gentler? Idunno.'
    },
    {
      book: 'The Sandlot',
      reviewer: 'Mickey66',
      content: 'I thought this was a book based on the movie that I loved as a kid. Turns out is about something completely isDifferent.'
    }
  ]
  constructor(private apiService: ApiService, private authService: AuthService) { 
    this.books.push({
      title: 'Moby Dick',
      author: 'Herman Melville',
      published: 1945,
  })
    this.books.push({
      title: 'It',
      author: 'Stephen King',
      published: 1981
    })
    this.books.push({
      title: 'The Scarlett Letter',
      author: 'Some lady',
      published: 1951
    })
    this.books.push({
      title: 'The Hunchback of Notre Dame',
      author: 'poopoohead',
      published: 1840
    })
    this.books.push({
      title: 'Robinson Crusoe',
      author: 'Alexandre Dumas',
      published: 1850
    })
    this.books.push({
      title: 'Freakonomics',
      author: 'Jackson Bombas',
      published: 1998
    })
    this.books.push({
      title: 'Cravens Memoirs',
      author: 'Ronald Reagan',
      published: 1985
    })
    this.books.push({
      title: 'The Communist Manifesto',
      author: 'Karl Marx',
      published: 1917
    })
    this.books.push({
      title: 'A Brief History of the Universe',
      author: 'Stephen Hawking',
      published: 1980
    })
    this.books.push({
      title: 'Romeo and Juliet',
      author: 'William Shakespeare',
      published: 1745
    })
    this.books.push({
      title: 'Pride and Prejudice',
      author: 'some lady',
      published: 1880
    })
    this.books.push({
      title: 'Walk the Line',
      author: 'Johnny Cash lol',
      published: 1990
    })
    this.books.push({
      title: 'Pride and Prejudice',
      author: 'some lady',
      published: 1880
    })
    this.subscription = this.authService.getMessage().subscribe(data => { 
      // console.log('huzzah! x222', this.authService.loggedInUser)

      // if(data.id == 'id_transfer'){
      //   console.log('setting admin to TRUE');
      // } 
    });
  }

  ngOnInit() {
    // this.apiService.getBooks()
    // console.log(localStorage);
    
    if(localStorage.getItem('token')){
      // console.log('huzzah!');
      this.isLoggedIn = true;
    }
    var that = this;
    setTimeout(function(){
      // console.log('hey timeout')
      // console.log('checking logged in user ', that.authService.loggedInUser);
    }, 1000)
    // console.log('checking logged in user ', this.authService.loggedInUser);
    
  }
  tabClick(e){
    //workaround for nested tabgroup not rendering
    window.dispatchEvent(new Event('resize'))
  }
  expandRequest(i){
    console.log('expanding card', i);
    if(this.expandedRequestIndex === i) this.expandedRequestIndex = null; else this.expandedRequestIndex = i;
  }
  // acceptRequest(i){
  //   this.authService.acceptRequest
  //   this.authService.loggedInUser ? this.authService.loggedInUser.inbound_friend_requests = 0 : null
  // }
  whodis(index){
    console.log('hey!', this.books[index]);
  }
}
