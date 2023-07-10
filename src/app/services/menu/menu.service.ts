import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MenuItem } from "../../interfaces/menu-item";
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  constructor(private http: HttpClient) {
  }

  getMenu() {
    return this.http.get<MenuItem[]>(`${environment.apiUrl}menus`).pipe(take(1))
  }

  newMenu(menu: MenuItem) {
    return this.http.post(`${environment.apiUrl}menu/new`, menu).pipe(take(1))
  }

  saveImage(image: File) {
    const formData = new FormData();
    formData.append("file", image);
    return this.http.post(`${environment.apiUrl}file/upload`, formData).pipe(take(1))
  }

  updateMenu(menu: MenuItem) {
    return this.http.post(`${environment.apiUrl}menu/update`, menu).pipe(take(1))
  }

  deleteMenu(productId: string) {
    return this.http.delete(`${environment.apiUrl}menu/delete/${productId}`).pipe(take(1))
  }

}
