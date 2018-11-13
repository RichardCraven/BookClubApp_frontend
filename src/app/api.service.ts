import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment } from  '../environments/environment'

@Injectable()
export class ApiService {
    messages = [];
    users = [];
    books = [];
    path = environment.path

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
    addFriend(userData){
        console.log('in auth service, adding friend, userData is ', userData);
        
        this.http.post<any>(this.path + '/addfriend', userData)
        .subscribe(res => {
            console.log('in addfriend res, res is', res);
        },
        err => {
            if(err.status == 418){
                // this.userRejected = true;
                // var that = this;
                // setTimeout(function(){
                //     that.userRejected = false;
                //     that.sendMessage('clear-fields')
                // }, 3500);
                
            }
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