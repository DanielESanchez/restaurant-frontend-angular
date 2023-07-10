import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users-list-form',
  templateUrl: './users-list-form.component.html',
  styleUrls: ['./users-list-form.component.scss']
})
export class UsersListFormComponent {
  users?: any
  foundUsers: boolean = true

  constructor(
    private userService: UserService,
    private router: Router) {
  }

  async ngOnInit() {
    this.users = await lastValueFrom(this.userService.getAllUsers()).catch(() => this.foundUsers = false)
    for (const key in this.users) {
      this.users[key].createdAt = new Date(this.users[key].createdAt)
      if(!this.users[key].idEmployee){
        this.users[key].idEmployee = "Normal user"
      }
    }
  }

  clear(table: Table) {
    table.clear();
  }

  getEmployee(idEmployee: string, job: string) {
    this.router.navigate([`/update-employee/${job}/${idEmployee}`])
  }
}
