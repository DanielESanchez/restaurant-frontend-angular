import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupUserComponent } from './pages/signup-user/signup-user.component';
import { authAdminGuard } from './guards/auth-admin.guard';
import { SaveEmployeeComponent } from './pages/save-employee/save-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { SignupEmployeeUserFormComponent } from './components/signup-employee-user-form/signup-employee-user-form.component';
import { UsersComponent } from './pages/users/users.component';
import { SaveToMenuComponent } from './pages/save-to-menu/save-to-menu.component';
import { CheckOrderComponent } from './pages/check-order/check-order.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupUserComponent
  },
  {
    path: 'save-employee',
    component: SaveEmployeeComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'update-employee/:job/:id',
    component: UpdateEmployeeComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'list-employee',
    component: ListEmployeesComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'signup-employee/:job/:id',
    component: SignupEmployeeUserFormComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'new-menu',
    component: SaveToMenuComponent,
    canActivate: [authAdminGuard]
  },
  {
    path: 'check-order',
    component: CheckOrderComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
