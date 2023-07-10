import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/app/interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class SaveCookieService {

  constructor(private cookieService: CookieService) { }

  saveToken(token: string, expiration: string) {
    const expirationDate: Date = new Date(expiration)
    this.cookieService.set("token", token, expirationDate)
  }

  saveRoles(roles: Role[], expiration: string) {
    let rolesToSave: string[] = []
    for (const keyrole in roles) {
      rolesToSave.push(roles[keyrole].authority)
    }
    const arrayRoles: string[] = rolesToSave
    const stringRoles: string = arrayRoles.join(",")
    const expirationDate: Date = new Date(expiration)
    this.cookieService.set("roles", stringRoles, expirationDate)
  }
}
