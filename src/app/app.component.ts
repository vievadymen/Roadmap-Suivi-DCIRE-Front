import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { Role } from "./models/role";
import { User } from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Roadmap-Suivi-DCIRE-Front';
  currentUser:any;

  constructor(
      private router: Router,
      private auth: AuthService
  ) {
      this.auth.user.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
      return this.currentUser && this.currentUser.roles === Role.Admin;
  }

  logout() {
      this.auth.logout();
      this.router.navigate(['/connexion']);
  }
}

