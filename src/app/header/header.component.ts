import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthService

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x); 
  }

  ngOnInit() {
    console.log(this.currentUser);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
