import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieValidatorService } from './cookie-validator.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private cookieValidatorService: CookieValidatorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string = ""
    if (this.cookieValidatorService.validateCookie()) token = this.cookieValidatorService.getAuthCookie();
    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    return next.handle(authReq);
  }
}