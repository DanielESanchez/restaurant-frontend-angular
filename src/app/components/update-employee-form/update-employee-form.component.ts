import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { Job } from 'src/app/interfaces/job';
import { UpdateEmployeeService } from 'src/app/services/employee/update-employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { GetEmployeeService } from 'src/app/services/employee/get-employee.service';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-employee-form',
  templateUrl: './update-employee-form.component.html',
  styleUrls: ['./update-employee-form.component.scss'],
  providers: [MessageService]
})
export class UpdateEmployeeFormComponent {

  idEmployee: string | null
  jobEmployee: string | null
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
  statusEmployee: string = "Not Working"
  savedEmployee: boolean = true

  constructor(
    private updateEmployeeService: UpdateEmployeeService,
    private getEmployeeService: GetEmployeeService,
    private route: ActivatedRoute,
    public messageService: MessageService) {
    this.employee = {
      name: "",
      lastName: "",
      idPerson: "",
      age: "",
      email: "",
      phone: "",
      address: "",
      registered: "",
      isEmployee: true,
      idEmployee: "",
      job: "",
      hireDate: "",
      isWorking: false,
      salary: ""
    };
    this.idEmployee = null
    this.jobEmployee = null
  }

  async ngOnInit(): Promise<void> {
    this.jobs = [
      { name: 'Chef', value: 'chef' },
      { name: 'Waiter', value: 'waiter' },
      { name: 'Cashier', value: 'cashier' },
    ];
    this.setEmployeeToSearch();
    if (!this.idEmployee || !this.jobEmployee) {
      this.savedEmployee = false
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error retrieving the employee, please try again later.` });
      return
    }
    const employee: any = await lastValueFrom(this.getEmployeeService.getEmployee(this.idEmployee, this.jobEmployee)).catch(() => {
      this.savedEmployee = false
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error retrieving the employee, please try again later.` });
    })
    if (!employee) {
      return
    }
    this.setFoundEmployee(employee)
  }

  setFoundEmployee(employeeResponse: any) {
    this.employee.name = employeeResponse.name
    this.employee.lastName = employeeResponse.lastName
    this.employee.idPerson = employeeResponse.idPerson
    this.employee.age = employeeResponse.age
    this.employee.email = employeeResponse.email
    this.employee.phone = employeeResponse.phone
    this.employee.address = employeeResponse.address
    this.employee.registered = employeeResponse.registered
    this.employee.isEmployee = employeeResponse.isEmployee
    this.employee.idEmployee = employeeResponse.idEmployee
    this.employee.hireDate = employeeResponse.hireDate
    this.employee.job = employeeResponse.job
    this.employee.isWorking = employeeResponse.isWorking
    this.employee.salary = employeeResponse.salary
    if (this.employee.isWorking) {
      this.statusEmployee = "Working"
    } else {
      this.statusEmployee = "Not Working"
    }
  }

  setEmployeeToSearch() {
    this.idEmployee = this.route.snapshot.paramMap.get('id');
    this.jobEmployee = this.route.snapshot.paramMap.get('job');
  }

  update(): void {
    if (!this.checkEmployee()) return
    console.log(this.employee)
    this.updateEmployeeService.updateEmployee(this.employee).subscribe(
      {
        next: (response) => {
          {
            this.savedEmployee = true
            this.messageService.add({ severity: 'success', summary: 'Saved', detail: `The employee was updated.` });
          }
        },
        error: (error: HttpErrorResponse) => {
          {
            this.savedEmployee = false
            this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error saving the employee, please try again later.` });
          }
        }
      }
    )

  }

  onCloseToast() {
    if (this.savedEmployee) window.location.reload
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
      this.employee.age = Number(this.employee.age)
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
      this.employee.salary = Number(this.employee.salary)
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
