import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { MenuItem } from "../../interfaces/menu-item";
import { DataViewLayoutOptions } from 'primeng/dataview';
import { environment } from 'src/environments/environment';
import { MessageService, SelectItem } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChooseQuantityComponent } from "src/app/components/choose-quantity/choose-quantity.component";
import { MenuLocalstorageService } from 'src/app/services/menu/menu-localstorage.service';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class MenuListComponent implements OnInit, OnDestroy {
  private products!: any;
  productsToFilter!: any
  categoryOptions!: SelectItem[];
  sortOrder!: number;
  categoryKey!: string;
  sortField!: string;
  layout: "list" | "grid" = "list";
  environmentData = environment
  ref: DynamicDialogRef | undefined;
  productsToAdd: any[] = []

  constructor(private menuService: MenuService,
    public dialogService: DialogService,
    private menuLocalstorageService: MenuLocalstorageService,
    public messageService: MessageService) {
  }

  async ngOnInit(): Promise<void> {
    this.products = await lastValueFrom(this.menuService.getMenu()).catch(() => { console.log("No items loades") })
    this.productsToFilter = this.products
    this.categoryOptions = [
      {
        label: "Show All",
        value: "all"
      }
    ]
    for (const key in this.products) {
      const category: string = this.products[key].categoryName
      const categoryToAdd = {
        label: category,
        value: category
      }
      const foundCategory = this.categoryOptions.filter((categoryItem) => { return categoryItem.label == category })
      if (foundCategory.length < 1) {
        this.categoryOptions.push(categoryToAdd)
      }
    }
  }

  onCategoryChange(event: any) {
    let value = event.value;
    this.productsToFilter = []
    if (value === "all") {
      this.productsToFilter = this.products
      return
    }
    for (const key in this.products) {
      if (this.products[key].categoryName === value) {
        this.productsToFilter.push(this.products[key])
      }
    }
  }

  show(product: any) {
    this.ref = this.dialogService.open(ChooseQuantityComponent, {
      header: 'Select a Quantity',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });

    this.ref.onClose.subscribe((quantity: string) => {
      if (quantity) {
        const savedMenu = this.menuLocalstorageService.getMenuFromLocal()
        if (savedMenu) {
          this.productsToAdd = JSON.parse(savedMenu)
          product.quantity = quantity
          let found = false
          for (const key in this.productsToAdd) {
            if (this.productsToAdd[key]._id === product._id) {
              this.productsToAdd[key].quantity = quantity
              found = true
            }
          }
          if (!found) {
            this.productsToAdd.push(product)
          }
          this.menuLocalstorageService.saveMenuLocal(JSON.stringify(this.productsToAdd))
        } else {
          this.productsToAdd.push(product)
          this.menuLocalstorageService.saveMenuLocal(JSON.stringify(this.productsToAdd))
        }
        this.messageService.add({ severity: 'success', summary: 'Added', detail: `Item added to your order.`, closable: true});
      }
      
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

}
