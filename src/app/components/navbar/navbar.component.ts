import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { CheckRoleService } from 'src/app/services/authentication/check-role.service';
import { LoginService } from 'src/app/services/authentication/login.service';
import { MenuLocalstorageService } from 'src/app/services/menu/menu-localstorage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [MessageService]
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;
    isMainPage: boolean = false
    itemsAdded: string = '0'
    public storageSubObs?: Observable<any>
    private storageSub = new Subject<string>();


    constructor(private menuLocalstorageService: MenuLocalstorageService,
        private checkRoleService: CheckRoleService,
        private loginService: LoginService,
        private messageService: MessageService,
        private cookieService: CookieService,
        private router: Router) { }

    ngOnInit() {
        this.storageSubObs = this.storageSub.asObservable();
        const path = location.pathname
        if (path == "/") this.isMainPage = true
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                routerLink: '/',
            },
            {
                label: 'Cart',
                icon: 'pi pi-fw pi-shopping-cart',
                routerLink: '/check-order',
                badge: this.menuLocalstorageService.getQuantityOfItems()
            },
            {
                label: 'New Menu',
                icon: 'pi pi-fw pi-plus',
                visible: this.checkRoleService.hasRole("ADMIN"),
                routerLink: '/new-menu'
            },
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                visible: this.checkRoleService.hasRole("ADMIN"),
                routerLink: '/users'
            },
            {
                label: 'Employees',
                icon: 'pi pi-fw pi-user',
                visible: this.checkRoleService.hasRole("ADMIN"),
                items: [
                    {
                        label: 'Add Employee',
                        icon: 'pi pi-fw pi-user-plus',
                        routerLink: "/save-employee"
                    },
                    {
                        label: "Employee's List",
                        icon: 'pi pi-fw pi-users',
                        routerLink: "/list-employee"

                    }
                ]
            },
            {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                visible: !this.loginService.isLoggedIn(),
                routerLink: "/login"
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-sign-out',
                visible: this.loginService.isLoggedIn(),
                command: () => {
                    this.cookieService.deleteAll()
                    this.messageService.add({ severity: 'success', summary: 'Logged Out', detail: "" });

                }
            }
        ];
        this.storageSubObs.subscribe((data: string) => {
            this.storageSub
        })
    }

    onClose() {
        window.location.href = ""
    }

    goCheck() {
        this.router.navigate(["/check-order"])
    }

    home() {
        this.onClose()
    }
}
