import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environment';
import { AccountService } from '../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        console.log('isLoggedIn', isLoggedIn);
        console.log('isApiUrl', isApiUrl);
        // console.log('user.token', user?.token);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        // request = request.clone({
        //     setHeaders: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        //         'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
        //         'Content-Type': 'application/json'
        //     }
        // });
        console.log(request);

        return next.handle(request);
    }
}
