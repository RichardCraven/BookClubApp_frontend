import { Injectable, Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private injector : Injector){}
    intercept(req, next){
        
        var authService = this.injector.get(AuthService)
        var authRequest = req.clone()
        if(req.method !== 'GET'){
            console.log('authorizing injector');
            var authRequest = req.clone({
                // if(req.method !== 'POST'){
                    headers: req.headers.set('Authorization', 'token ' + authService.token)
                // }
            })
        }
        
        
        return next.handle(authRequest) 
        // return next().handle()
    }
}