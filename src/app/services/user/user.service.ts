import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(idEmployee: string, job: string) {
    return this.http.get(`${environment.apiUrl}${job}/get/${idEmployee}`).pipe(take(1))
  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}users`).pipe(take(1))
  }
}
