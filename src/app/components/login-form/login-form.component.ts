import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInfo } from 'src/app/interfaces/login';
import { ResponseToken } from 'src/app/interfaces/response-token';
import { LoginService } from 'src/app/services/authentication/login.service';
import { SaveCookieService } from 'src/app/services/authentication/save-cookie.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [MessageService]
})
export class LoginFormComponent {
  password?: string;
  email?: string;

  constructor(private loginService: LoginService,
    private saveCookieService: SaveCookieService,
    private router: Router,
    private messageService: MessageService) {
    if (loginService.isLoggedIn()) {
      this.router.navigate(["/"])
    }
  }

  login() {
    if (!this.email || !this.password) return;
    const loginInfo: LoginInfo = {
      username: this.email,
      password: this.password
    }
    this.loginService.login(loginInfo).subscribe(
      {
        next: (response: ResponseToken) => {
          this.saveCookieService.saveToken(response.token, response.expiration)
          this.saveCookieService.saveRoles(response.roles, response.expiration)
          this.router.navigate(["/"])
        },
        error: (errorHttp: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was retriving your account, the email or password is incorrect.`, closable: true });
        }
      }
    )
  }
}
