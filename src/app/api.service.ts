import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ApiService {
    messages = [];
    users = [];
    books = [];
    path = 'http://localhost:3000'

    constructor(private http: HttpClient){}

    getMessages(userId){
        this.http.get<any>(this.path + '/posts/' + userId).subscribe(res => {
            this.messages = res;
        })
    }
    postMessages(message) {
        console.log('MESSAGE IS ', message);
        
        this.http.post(this.path + '/post', message).subscribe(res => {
        })
    }
    getUsers() {
        this.http.get<any>(this.path + '/users').subscribe(res => {
            this.users = res;
        })
    }
    getProfile(id) {
        return this.http.get(this.path + '/profile/' + id)
    }
    getBooks(){
        return this.http.get('https://www.googleapis.com/books/v1/volumes/s1gVAAAAYAAJ').subscribe(res => {
            console.log('rese is ', res);
            
        })
    }
}