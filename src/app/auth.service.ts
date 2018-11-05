import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
// import { RegistrationComponent } from  './registration/registration.component'

@Injectable()
export class AuthService {
    private subject = new Subject<any>();
    
    userRejected = false;
    path = 'http://localhost:3000/auth'
    TOKEN_KEY = 'token'
    shitIsBunk = false;

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
            this.login(res.token, res.name)
        },
        err => {
            if(err.status == 418){
                this.userRejected = true;
                var that = this;
                setTimeout(function(){
                    that.userRejected = false;
                    that.sendMessage('clear-fields')
                }, 3500);
                
            }
        })
    }
    loginUser(loginData) {
        this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
            this.login(res.token, res.name)
        })
    }
    login(token, name){
        localStorage.setItem(this.TOKEN_KEY, token)
        localStorage.setItem('name', name)
        this.router.navigate(['/']);
    }
    logout(){
        localStorage.clear()
        this.router.navigate(['/login']);
    }
    //observable practice
    sendMessage(message: string) {
        this.subject.next({ message: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}