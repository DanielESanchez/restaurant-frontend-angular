import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoginInfo } from 'src/app/interfaces/login';
import { ResponseToken } from 'src/app/interfaces/response-token';
import { environment } from "src/environments/environment";
import { CookieValidatorService } from './cookie-validator.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookieValidatorService: CookieValidatorService) { }

  login(loginInfo: LoginInfo) {
    return this.http.post<ResponseToken>(`${environment.apiUrl}user/login`, loginInfo)
  }

  isLoggedIn() {
    return this.cookieValidatorService.validateCookie()
  }
}
