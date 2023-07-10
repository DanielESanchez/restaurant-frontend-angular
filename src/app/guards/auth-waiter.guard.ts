import { CanActivateFn, Router } from '@angular/router';
import { CheckRoleService } from '../services/authentication/check-role.service';
import { inject } from '@angular/core';

export const authWaiterGuard: CanActivateFn = () => {
  const isWaiter: boolean = inject(CheckRoleService).hasRole("WAITER");
  const router: Router = inject(Router)
  if (!isWaiter) {
    router.navigate(["/"])
  }
  return true
}
