import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuLocalstorageService {

  constructor() { }

  getMenuFromLocal() {
    return localStorage.getItem("menu")
  }

  isMenuSavedInLocal(): boolean {
    return !!localStorage.getItem("menu")
  }

  saveMenuLocal(menu: string) {
    localStorage.setItem("menu", menu)
  }

  removeMenu() {
    localStorage.removeItem("menu")
  }

  getQuantityOfItems(): string {
    const menuSaved = this.getMenuFromLocal()
    if (!menuSaved) return ""
    return JSON.parse(menuSaved).length
  }
}
