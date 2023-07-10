import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/interfaces/employee';
import { Job } from 'src/app/interfaces/job';
import { ResponseToken } from 'src/app/interfaces/response-token';
import { SaveEmployeeService } from 'src/app/services/employee/save-employee.service';

@Component({
  selector: 'app-save-employee-form',
  templateUrl: './save-employee-form.component.html',
  styleUrls: ['./save-employee-form.component.scss'],
  providers: [MessageService]
})
export class SaveEmployeeFormComponent implements OnInit {
  jobs?: Job[];
  employee: Employee
  dirt: string = "ng-invalid ng-dirty"
  clean: string = ""
  validName: boolean = true
  validLastName: boolean = true
  validIdPerson: boolean = true
  validPhone: boolean = true
  validAddress: boolean = true
  validIdEmployee: boolean = true
  validJob: boolean = true
  validEmail: boolean = true
  validAge: boolean = true
  validSalary: boolean = true
  savedEmployee: boolean = true

  constructor(private saveEmployeeService: SaveEmployeeService,
    private messageService: MessageService,
    private router: Router) {
    this.employee = {
      name: "",
      lastName: "",
      idPerson: "",
      age: "",
      email: "",
      phone: "",
      address: "",
      registered: new Date().toDateString(),
      isEmployee: true,
      idEmployee: "",
      job: "",
      hireDate: new Date().toDateString(),
      isWorking: false,
      salary: ""
    };
  }

  ngOnInit(): void {
    this.jobs = [
      { name: 'Chef', value: 'chef' },
      { name: 'Waiter', value: 'waiter' },
      { name: 'Cashier', value: 'cashier' },
    ];
  }

  save(): void {
    if (!this.checkEmployee()) {
      this.savedEmployee = false
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please add all fields to save this employee.`, closable: true });
      return
    }
    this.saveEmployeeService.saveEmployee(this.employee).subscribe(
      {
        next: (response: any) => {
          this.savedEmployee = true
          this.messageService.add({ severity: 'success', summary: 'Saved', detail: `The employee: ${this.employee.name} ${this.employee.lastName} (${this.employee.idEmployee}) was saved. Now you have have to set the user for this employee in the next page`, sticky: true, closable: false });
        },
        error: (errorHttp: HttpErrorResponse) => {
          this.savedEmployee = false
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error saving the employee, please try again later.`, closable: true });
        }
      }
    )
  }

  onConfirm() {
    this.messageService.clear()
    this.router.navigate([`signup-employee/${this.employee.job}/${this.employee.idEmployee}`])
  }

  checkString(stringToCheck: string): boolean {
    if (stringToCheck.length < 1) return false
    return true
  }

  checkEmail(emailToCheck: string): boolean {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const result: boolean = expression.test(emailToCheck);
    return (!result) ? false : true
  }

  checkNumber(valueToCheck: string | number): boolean {
    const number = Number(valueToCheck)
    return (!number || number < 18) ? false : true
  }

  checkEmployee(): boolean {
    if (!this.checkString(this.employee.name)) {
      this.validName = false
      return false
    }
    if (!this.checkString(this.employee.lastName)) {
      this.validLastName = false
      return false
    }
    if (!this.checkEmail(this.employee.email)) {
      this.validEmail = false
      return false
    }
    if (!this.checkString(this.employee.idPerson)) {
      this.validIdPerson = false
      return false
    }
    if (!this.checkNumber(this.employee.age)) {
      this.validAge = false
      return false
    }
    if (!this.checkString(this.employee.phone)) {
      this.validPhone = false
      return false
    }
    if (!this.checkString(this.employee.address)) {
      this.validAddress = false
      return false
    }
    if (!this.checkString(this.employee.job)) {
      this.validJob = false
      return false
    }
    if (!this.checkString(this.employee.idEmployee)) {
      this.validIdEmployee = false
      return false
    }
    if (!this.checkNumber(this.employee.salary)) {
      this.validSalary = false
      return false
    }
    this.validName = true
    this.validLastName = true
    this.validIdPerson = true
    this.validPhone = true
    this.validAddress = true
    this.validIdEmployee = true
    this.validJob = true
    this.validEmail = true
    this.validAge = true
    this.validSalary = true
    return true
  }

}
