import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  providers: [MessageService]
})
export class LogoutComponent implements OnInit {
  constructor(private cookieService: CookieService,
    public messageService: MessageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.logout()
  }

  logout(){
    this.messageService.add({ severity: 'success', summary: 'Logged Out', detail: "" });
  }

  onClose() {
    this.router.navigate(['/'])
  }

}
