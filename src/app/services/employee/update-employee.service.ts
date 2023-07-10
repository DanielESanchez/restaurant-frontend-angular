import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/interfaces/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService {

  constructor(private http: HttpClient) { }

  updateEmployee(newEmployee: Employee) {
    return this.http.put(`${environment.apiUrl}${newEmployee.job}/update`, newEmployee)
  }
}
