import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  userListLocal: any;
  userList: Array<User> = [];

  constructor(
    public router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) {
    this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];

    if (!this.userListLocal || this.userListLocal.length === 0) {
      this.userList;
    } else {
      this.userList = this.userListLocal;
    }
  }

  ngOnInit() {
    this.loginService.$loggedInUser
      .subscribe((value) => {
        this.currentUser = value;
      });
  }

  logout() {
    this.userList[this.currentUser.userId].status = false;
    this.router.navigate(['/login']);
    this.authService.logout();
    this.loginService.$loggedInUserSubject.next(null);
    localStorage.setItem('userListLocal', JSON.stringify(this.userList));
    localStorage.removeItem('currentUser');
  }

}
