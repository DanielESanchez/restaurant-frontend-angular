import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  newOrder(order: Order) {
    return this.http.post(`${environment.apiUrl}order/new`, order).pipe(take(1))
  }
}
