import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginInfo } from 'src/app/interfaces/login';
import { ResponseToken } from 'src/app/interfaces/response-token';
import { SignUpUser } from 'src/app/interfaces/signup-user';
import { NewUserService } from 'src/app/services/authentication/new-user.service';
import { SaveCookieService } from 'src/app/services/authentication/save-cookie.service';

@Component({
  selector: 'app-signup-user-form',
  templateUrl: './signup-user-form.component.html',
  styleUrls: ['./signup-user-form.component.scss'],
  providers: [MessageService]
})
export class SignupUserFormComponent {
  password: string = "";
  email: string = "";
  firstName: string = "";
  lastName: string = "";
  validEmail: boolean = true
  validPass: boolean = true
  validFirstName: boolean = true
  validLastName: boolean = true
  dirt: string = "ng-invalid ng-dirty"
  clean: string = ""
  private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;
  private savedUser: boolean = true

  constructor(private newUserService: NewUserService,
    private saveCookieService: SaveCookieService,
    private router: Router,
    public messageService: MessageService) { }

  saveUser() {
    this.checkEmail()
    this.checkPassword()
    this.checkFirstName()
    this.checkLastName()
    if (!this.validEmail || !this.validPass || !this.validFirstName || !this.validLastName) {
      this.savedUser = false
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please check all fields to save your user.` });
      return
    }
    const userToSave: SignUpUser = {
      username: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }
    this.newUserService.saveNewUser(userToSave).subscribe(
      {
        next: (response: ResponseToken) => {
          this.savedUser = true
          this.saveCookieService.saveToken(response.token, response.expiration)
          this.saveCookieService.saveRoles(response.roles, response.expiration)
          this.messageService.add({ severity: 'success', summary: 'Welcome', detail: `Your account is now ready to be used.` });
        },
        error: (errorHttp: HttpErrorResponse) => {
          this.savedUser = false
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error saving your user, please try again later.` });
        }
      }
    )
  }

  private checkFirstName() {
    (this.firstName.length < 1) ? this.validFirstName = false : this.validFirstName = false
  }

  private checkLastName() {
    (this.lastName.length < 1) ? this.validLastName = false : this.validLastName = false
  }


  private checkEmail() {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = expression.test(this.email);
    if (!result) {
      this.validEmail = false
      return
    }
    this.validEmail = true
  }

  private isPasswordCommon(password: string): boolean {
    return this.commonPasswordPatterns.test(password)
  }

  private checkPassword() {
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(this.password) ? ++numberOfElements : numberOfElements
    numberOfElements = /.*[A-Z].*/.test(this.password) ? ++numberOfElements : numberOfElements
    numberOfElements = /.*[0-9].*/.test(this.password) ? ++numberOfElements : numberOfElements

    if (this.password === null || this.password.length < 8) {
      this.validPass = false
    } else if (this.isPasswordCommon(this.password) === true) {
      this.validPass = false
    } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
      this.validPass = false
    } else {
      this.validPass = true
    }
  }

  onCloseToast() {
    if (this.savedUser) this.router.navigate(["/"])
  }
}
