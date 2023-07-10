import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeleteEmployeeService {

  constructor(private http: HttpClient) { }

  deleteEmployee(idEmployee: string, job: string) {
    return this.http.delete(`${environment.apiUrl}${job}/delete/${idEmployee}`)
  }
}
