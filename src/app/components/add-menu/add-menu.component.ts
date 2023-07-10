import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
  providers: [MessageService]
})
export class AddMenuComponent {
  menu: MenuItem
  image: File | undefined | null
  responseImage: any
  isErrorForm: boolean = false

  constructor(private menuService: MenuService, public messageService: MessageService) {
    this.menu = {
      productId: "",
      name: "",
      image: "",
      price: 0,
      consumable: "",
      cuisineName: "",
      categoryName: "",
      description: ""
    }
  }

  checkMenu(): boolean {
    if (this.menu.productId.length < 1) return false
    if (this.menu.name.length < 1) return false
    if (!this.image) return false
    if (this.menu.consumable.length < 1) return false
    if (this.menu.cuisineName.length < 1) return false
    if (this.menu.categoryName.length < 1) return false
    if (this.menu.description.length < 1) return false
    if (this.menu.price < 1) return false
    return true
  }

  async saveMenu() {
    this.isErrorForm = false
    this.messageService.add({ severity: 'warn', summary: 'Continue?', detail: `Are you sure you want to save ${this.menu.name}?`, sticky: true, closable: false });
  }

  async saveConfirmed() {
    if (!this.image) {
      this.isErrorForm = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please add an image.`, sticky: true, closable: true });
      return
    }
    this.responseImage = await lastValueFrom(this.menuService.saveImage(this.image)).catch(() => {
      this.isErrorForm = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error saving ${this.menu.name}, please try again later.`, sticky: true, closable: true });
    })
    this.menu.image = this.responseImage.response
    if (!this.checkMenu) {
      this.isErrorForm = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please add all fields to save the new item.`, sticky: true, closable: true });
    }
    const responseMenu = await lastValueFrom(this.menuService.newMenu(this.menu)).catch(() => {
      this.isErrorForm = true
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `There was an error saving ${this.menu.name}, please try again later.`, sticky: true, closable: true });
      this.deleteMenu()
    })
    if (!responseMenu) return
    this.messageService.add({ severity: 'success', summary: 'Item Saved', detail: `The item ${this.menu.name}, was added to the menu.`, sticky: true, closable: true })
  }

  onConfirm() {
    this.closeMessages()
    this.saveConfirmed()
  }

  onReject() {
    this.closeMessages()
  }

  closeMessages() {
    this.messageService.clear()
  }

  onSelect(event: any) {
    this.image = event.files[0];
    console.log(this.image)
  }

  onRemove() {
    this.image = null
  }

  async deleteMenu() {
    const response = await lastValueFrom(this.menuService.deleteMenu(this.menu.productId)).catch()
  }

}
