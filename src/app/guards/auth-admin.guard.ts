import { CanActivateFn, Router } from '@angular/router';
import { CheckRoleService } from '../services/authentication/check-role.service';
import { inject } from '@angular/core';

export const authAdminGuard: CanActivateFn = () => {
  const isAdmin: boolean = inject(CheckRoleService).hasRole("ADMIN")
  const router: Router = inject(Router)
  if (!isAdmin) {
    router.navigate(["/"])
  }
  return true
}

