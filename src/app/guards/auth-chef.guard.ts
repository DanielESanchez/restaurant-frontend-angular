import { CanActivateFn, Router } from '@angular/router';
import { CheckRoleService } from '../services/authentication/check-role.service';
import { inject } from '@angular/core';

export const authChefGuard: CanActivateFn = () => {
  const isChef: boolean = inject(CheckRoleService).hasRole("CHEF");
  const router: Router = inject(Router)
  if (!isChef) {
    router.navigate(["/"])
  }
  return true
}