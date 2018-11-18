import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import {environment } from  '../environments/environment'
import { RouterModule, Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
// import { RegistrationComponent } from  './registration/registration.component'

@Injectable()
export class AuthService {
    private subject = new Subject<any>();
    private idSubject = new Subject<any>();
    userRejected = false;
    loginRejected = false;
    loggedInUser;
    friendList = [];
    inboundRequestList = [];
    outboundRequestList = [];
    path = environment.path +'/auth'
    TOKEN_KEY = 'token'

    constructor(private http: HttpClient, private router: Router) { }

    get token(){
        return localStorage.getItem(this.TOKEN_KEY)
    }
    get userName(){
        return localStorage.getItem('name')
    }
    get isAuthenticated(){
        return !!localStorage.getItem(this.TOKEN_KEY)
        //! returns true if doesn't exist
        //!! returns true if it does exist
        //converts to boolean
    }
    registerUser(registrationData){
        this.http.post<any>(this.path + '/register', registrationData)
        .subscribe(res => {
            if(res.admin){
                this.sendMessage('isAdmin')
            } else {
                this.sendMessage('isNotAdmin')
            }
            this.login(res.token, res.name)
        },
        err => {
            if(err.status == 418){
                this.userRejected = true;
                this.sendMessage('clear-fields')
                var that = this;
                setTimeout(function(){
                    that.userRejected = false;
                }, 2500);
                
            }
        })
    }
    loginUser(loginData) {
        this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
            console.log('WAIT A GODDAM MINUTElogin data is ', res);
            
            this.login(res.token, res.user.name)
            this.loggedInUser = res.user;

            //the issue you were having is that you're checking this user's friend request list, 
            //when it's actually the requestee's list that has this user's id in it
            //so you gotta store an outbound request list and an inbound request list

            //OKAY so I've added an inbound/outbound list for users model, and a name field, test these out!

            for(var request in res.user.outbound_friend_requests){
                this.outboundRequestList.push(res.user.outbound_friend_requests[request])
            }
            console.log('outboundrequest list is ', this.outboundRequestList);
            for(var request in res.user.inbound_friend_requests){
                this.inboundRequestList.push(res.user.inbound_friend_requests[request])
            }
            console.log('inboundrequest list is ', this.outboundRequestList);
            for(var friend in res.user.friends){
                this.friendList.push(res.user.friends[friend])
            }
            console.log('friend list is ', this.friendList);
            // this.friendList = 
        },
        err => {
            console.log('error! is ', err)
            this.loginRejected = true;
            this.sendMessage('clear-fields')
            var that = this;
            setTimeout(function(){
                that.loginRejected = false;
            }, 2500);
        }
        )
    }
    login(token, name){
        localStorage.setItem(this.TOKEN_KEY, token)
        localStorage.setItem('name', name)
        this.checkAdminPrivileges()
        this.router.navigate(['/']);
    }
    logout(){
        localStorage.clear()
        this.router.navigate(['/login']);
        this.sendMessage('isNotAdmin')
        this.loggedInUser = null;
    }
    checkAdminPrivileges(){
        // console.log('checking for loggedin user');
        
        //need to reset loggedin user

        this.http.post<any>(this.path + '/checkAdmin', {dummyData : 'data'}).subscribe(res => {
            console.log('CHECKING ADMIN! res.user is ', res.user)

            this.loggedInUser = res.user;

            for(var request in res.user.outbound_friend_requests){
                this.outboundRequestList.push(res.user.outbound_friend_requests[request])
            }
            console.log('outboundrequest list is ', this.outboundRequestList);
            for(var request in res.user.inbound_friend_requests){
                this.inboundRequestList.push(res.user.inbound_friend_requests[request])
            }
            console.log('inboundrequest list is ', this.outboundRequestList);
            for(var friend in res.user.friends){
                this.friendList.push(res.user.friends[friend])
            }
            console.log('friend list is ', this.friendList);
            
            if(res.user.admin){
                this.sendMessage('isAdmin')
            } else {
                this.sendMessage('nlah blah blah')
            }
            // this.sendId(res.user._id)
            
        })
    }
    // checkId(){
    //     this.http.post<any>(this.path + '/checkId', {dummyData : 'data'}).subscribe(res => {

    //     })
    // }
    isLoggedIn(id){
        console.log('in ismatch, id is ', id);
        return this.http.post(this.path + '/isMatch', {id : id})
    }
    //observable practice
    sendMessage(message: string) {
        this.subject.next({ message: message });
    }
    // sendId(id: String){
    //     this.idSubject.next({id: id})
    // }
    clearMessage() {
        this.subject.next();
    }
    getId(): Observable<any> {
        return this.idSubject.asObservable();
    }
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}