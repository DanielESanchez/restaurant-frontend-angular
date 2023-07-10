import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/interfaces/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveEmployeeService {

  constructor(private http: HttpClient) { }

  saveEmployee(newEmployee: Employee) {
    return this.http.post(`${environment.apiUrl}${newEmployee.job}/new`, newEmployee)
  }
}
