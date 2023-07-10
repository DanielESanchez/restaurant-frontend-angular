import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CheckRoleService } from '../services/authentication/check-role.service';

export const authUserGuard: CanActivateFn = () => {
  const isUser: boolean = inject(CheckRoleService).hasRole("USER");
  const router: Router = inject(Router)
  if (!isUser) {
    router.navigate(["/"])
  }
  return true
}
