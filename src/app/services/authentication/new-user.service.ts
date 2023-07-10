import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { LoginInfo } from 'src/app/interfaces/login';
import { ResponseToken } from 'src/app/interfaces/response-token';
import { SignUpEmployee } from 'src/app/interfaces/signup-employee';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  constructor(private http: HttpClient) { }

  saveNewUser(user: LoginInfo) {
    return this.http.post<ResponseToken>(`${environment.apiUrl}user/new`, user);
  }

  saveNewUserEmployee(userEmployee: SignUpEmployee) {
    return this.http.post(`${environment.apiUrl}${userEmployee.job}/user/new`, userEmployee).pipe(take(1))
  }
}
