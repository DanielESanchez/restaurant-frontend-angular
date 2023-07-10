import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { SignUpEmployee } from 'src/app/interfaces/signup-employee';
import { NewUserService } from 'src/app/services/authentication/new-user.service';

@Component({
  selector: 'app-signup-employee-user-form',
  templateUrl: './signup-employee-user-form.component.html',
  styleUrls: ['./signup-employee-user-form.component.scss'],
  providers: [MessageService]
})
export class SignupEmployeeUserFormComponent implements OnInit {
  jobEmployee: string | null = ""
  password: string = "";
  username: string = "";
  idEmployee: string | null = "";
  validUsername: boolean = true
  validPass: boolean = true
  dirt: string = "ng-invalid ng-dirty"
  clean: string = ""
  private commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;
  private savedUser: boolean = true

  constructor(private route: ActivatedRoute,
    private router: Router,
    private newUserService: NewUserService,
    public messageService: MessageService) { }

  ngOnInit(): void {
    this.setEmployeeToSearch()
  }

  async saveUser() {
    this.checkPassword()
    this.checkUsername()
    if (!this.validPass || !this.validPass || !this.jobEmployee || !this.idEmployee) {
      this.savedUser = false
      return
    }
    const employeeUser: SignUpEmployee = {
      username: this.username,
      password: this.password,
      job: this.jobEmployee,
      idEmployee: this.idEmployee
    }
    const response = await lastValueFrom(this.newUserService.saveNewUserEmployee(employeeUser)).catch((error) => {
      this.savedUser = false
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error saving the user, please try again later.` });
    })
    if (!response) return
    this.savedUser = true
    this.messageService.add({ severity: 'success', summary: 'Saved', detail: `The user ${this.username} was saved.` });
  }

  onCloseToast() {
    (!this.savedUser) ? window.location.reload : this.router.navigate(["list-employee"])
  }

  private isPasswordCommon(password: string): boolean {
    return this.commonPasswordPatterns.test(password)
  }

  private checkUsername() {
    (this.username.length < 1) ? this.validUsername = false : this.validUsername = true
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

  setEmployeeToSearch() {
    this.idEmployee = this.route.snapshot.paramMap.get('id');
    this.jobEmployee = this.route.snapshot.paramMap.get('job');
  }
}
