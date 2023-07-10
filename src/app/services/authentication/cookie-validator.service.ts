import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieValidatorService {

  constructor(private cookieService: CookieService) { }

  validateCookie(): boolean {
    return this.cookieService.check("token")
  }

  getAuthCookie(): string {
    return this.cookieService.get("token")
  }
  
}
