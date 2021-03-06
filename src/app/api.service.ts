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
            for(var i in res){
                var date = new Date(res[i].last_active)
                res[i].last_active = date.toUTCString()
            }
            this.users = res;
        })
    }
    addFriend(userData){
        console.log('user data ', userData);
        
        this.http.post<any>(this.path + '/add_connection', userData)
        .subscribe(res => {
            console.log('in addfriend res, res is', res.message);
        },
        err => {
            console.log(err.error.message)
        })
    }
    requestConnection(userData){
        this.http.post<any>(this.path + '/request_connection', userData)
        .subscribe(res => {
            console.log('success');
        },
        err => {
            console.log(err.error.message)
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