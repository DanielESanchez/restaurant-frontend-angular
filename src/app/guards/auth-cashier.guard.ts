import { CanActivateFn, Router } from '@angular/router';
import { CheckRoleService } from '../services/authentication/check-role.service';
import { inject } from '@angular/core';

export const authCashierGuard: CanActivateFn = () => {
  const isCashier: boolean = inject(CheckRoleService).hasRole("CASHIER");
  const router: Router = inject(Router)
  if (!isCashier) {
    router.navigate(["/"])
  }
  return true
}