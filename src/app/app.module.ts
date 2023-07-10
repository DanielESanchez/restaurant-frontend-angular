import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { Interceptor } from './services/authentication/interceptor.service';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from "primeng/inputtext";
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { DividerModule } from "primeng/divider";
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from "primeng/table";
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';

import {CookieService} from 'ngx-cookie-service';
import { SignupUserFormComponent } from './components/signup-user-form/signup-user-form.component';
import { SignupUserComponent } from './pages/signup-user/signup-user.component';
import { SaveEmployeeFormComponent } from './components/save-employee-form/save-employee-form.component';
import { SaveEmployeeComponent } from './pages/save-employee/save-employee.component';
import { UpdateEmployeeFormComponent } from './components/update-employee-form/update-employee-form.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { ListEmployeeFormComponent } from './components/list-employee-form/list-employee-form.component';
import { ListEmployeesComponent } from './pages/list-employees/list-employees.component';
import { SignupEmployeeUserFormComponent } from './components/signup-employee-user-form/signup-employee-user-form.component';
import { SignupEmployeeComponent } from './pages/signup-employee/signup-employee.component';
import { UsersListFormComponent } from './components/users-list-form/users-list-form.component';
import { UsersComponent } from './pages/users/users.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddMenuComponent } from './components/add-menu/add-menu.component';
import { SaveToMenuComponent } from './pages/save-to-menu/save-to-menu.component';
import { ChooseQuantityComponent } from './components/choose-quantity/choose-quantity.component';
import { CheckOrderListComponent } from './components/check-order-list/check-order-list.component';
import { CheckOrderComponent } from './pages/check-order/check-order.component';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    MenuListComponent,
    LoginFormComponent,
    SignupUserFormComponent,
    SignupUserComponent,
    SaveEmployeeFormComponent,
    SaveEmployeeComponent,
    UpdateEmployeeFormComponent,
    UpdateEmployeeComponent,
    ListEmployeeFormComponent,
    ListEmployeesComponent,
    SignupEmployeeUserFormComponent,
    SignupEmployeeComponent,
    UsersListFormComponent,
    UsersComponent,
    FooterComponent,
    AddMenuComponent,
    SaveToMenuComponent,
    ChooseQuantityComponent,
    CheckOrderListComponent,
    CheckOrderComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    HttpClientModule,
    DataViewModule,
    ButtonModule,
    PasswordModule,
    DividerModule,
    FormsModule,
    BrowserAnimationsModule,
    CheckboxModule,
    RadioButtonModule,
    CardModule,
    KeyFilterModule,
    DropdownModule,
    TableModule,
    FileUploadModule,
    InputNumberModule,
    DynamicDialogModule,
    ToastModule,
    MessagesModule,
    InputTextareaModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
