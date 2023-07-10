import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { DeleteEmployeeService } from 'src/app/services/employee/delete-employee.service';
import { GetEmployeeService } from 'src/app/services/employee/get-employee.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-employee-form',
  templateUrl: './list-employee-form.component.html',
  styleUrls: ['./list-employee-form.component.scss'],
  providers: [MessageService]
})
export class ListEmployeeFormComponent implements OnInit {
  employees?: any
  foundCashiers: boolean = true
  foundChefs: boolean = true
  foundWaiters: boolean = true

  constructor(
    private getEmployeesService: GetEmployeeService,
    private deleteEmployeeService: DeleteEmployeeService,
    private router: Router,
    public messageService: MessageService) {
  }

  async ngOnInit() {
    const chefs = await lastValueFrom(this.getEmployeesService.getAllEmployeesForJob("chef")).catch(() => this.foundChefs = false)
    const waiters = await lastValueFrom(this.getEmployeesService.getAllEmployeesForJob("waiter")).catch(() => this.foundWaiters = false)
    const cashiers = await lastValueFrom(this.getEmployeesService.getAllEmployeesForJob("cashier")).catch(() => this.foundCashiers = false)
    this.employees = []
    if (this.foundChefs) {
      this.employees = this.employees.concat(chefs)
    }
    if (this.foundWaiters) {
      this.employees = this.employees.concat(waiters)
    }
    if (this.foundCashiers) {
      this.employees = this.employees.concat(cashiers)
    }
    for (const key in this.employees) {
      for (const key in this.employees) {
        this.employees[key].hireDate = new Date(this.employees[key].hireDate)
      }
    }
  }

  clear(table: Table) {
    table.clear();
  }

  getEmployee(idEmployee: string, job: string) {
    this.router.navigate([`/update-employee/${job}/${idEmployee}`])
  }

  deleteEmployee(idEmployee: string, job: string) {
    this.deleteEmployeeService.deleteEmployee(idEmployee, job).subscribe({
      next: (response) => {
        window.location.reload()
      },
      error: (error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `The employee could not be deleted, please try again later.`, closable: true });
      }
    })
  }
}
