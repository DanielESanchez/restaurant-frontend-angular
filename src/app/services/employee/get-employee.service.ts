import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeeService {

  constructor(private http: HttpClient) { }

  getEmployee(idEmployee: string, job: string) {
    return this.http.get(`${environment.apiUrl}${job}/get/${idEmployee}`).pipe(take(1))
  }

  getAllEmployeesForJob(job: string) {
    return this.http.get(`${environment.apiUrl}${job}s`).pipe(take(1))
  }
}
