import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-choose-quantity',
  templateUrl: './choose-quantity.component.html',
  styleUrls: ['./choose-quantity.component.scss']
})
export class ChooseQuantityComponent {
  quantity?: number
  valid: boolean = true
  constructor(public ref: DynamicDialogRef) { }

  selectProduct() {
    if (Number(this.quantity) < 0 || !Number(this.quantity)) {
      this.valid = false
      return
    }
    this.ref.close(this.quantity);
  }

}
