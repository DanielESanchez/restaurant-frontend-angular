import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { Order } from 'src/app/interfaces/order';
import { OrderItem } from 'src/app/interfaces/order-item';
import { MenuLocalstorageService } from 'src/app/services/menu/menu-localstorage.service';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/services/authentication/login.service';

@Component({
  selector: 'app-check-order-list',
  templateUrl: './check-order-list.component.html',
  styleUrls: ['./check-order-list.component.scss'],
  providers: [MessageService]
})
export class CheckOrderListComponent implements OnInit {
  products?: any
  environmentData = environment
  orderItem?: OrderItem
  order?: Order
  temporalQuantity: number = 0
  table: number = 0

  constructor(private menuLocalstorageService: MenuLocalstorageService,
    private orderService: OrderService,
    public messageService: MessageService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    const menuSave = this.menuLocalstorageService.getMenuFromLocal()
    if (!menuSave) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `You have not added anything to your order, go to main page and add some to proceed.`, sticky: true, closable: true })
      return
    }
    this.products = JSON.parse(menuSave)
    for (const key in this.products) {
      this.products[key].total = Number(this.products[key].price) * Number(this.products[key].quantity)
    }
  }

  async save(table: number) {
    if(!this.loginService.isLoggedIn()){
      this.messageService.add({ severity: 'warn', summary: 'Please login to complete your order', detail: "" });
      return
    }
    let orderList: OrderItem[] = []
    for (const key in this.products) {
      orderList.push(this.setOrderItem(this.setMenuItem(this.products[key])))
    }
    let order: Order = {
      orderList: orderList,
      waiterAssigned: "",
      isCompleted: false,
      table: Number(table)
    }
    const response = await lastValueFrom(this.orderService.newOrder(order)).catch(() => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error saving your order, please try again later.`, sticky: true, closable: true });
    })
  }

  setOrderItem(item: MenuItem): OrderItem {
    const orderItem: OrderItem = {
      menuItem: item,
      quantity: this.temporalQuantity,
      chefAssigned: "",
      isBeingCooked: false,
      isCompleted: false
    }
    return orderItem
  }

  setMenuItem(item: any): MenuItem {
    this.temporalQuantity = item.quantity
    const menuItem: MenuItem = {
      productId: item.productId,
      name: item.name,
      image: item.image,
      price: item.price,
      consumable: item.consumable,
      cuisineName: item.cuisineName,
      categoryName: item.categoryName,
      description: item.description
    }
    return menuItem
  }
}
