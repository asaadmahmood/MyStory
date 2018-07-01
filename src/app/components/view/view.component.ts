import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'ms-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  userListLocal: any;
  userList: Array<object> = [];

  constructor(
    public router: Router,
    private loginService: LoginService
  ) {

  }

  ngOnInit() {
    this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];

    if (!this.userListLocal || this.userListLocal.length === 0) {
      this.userList;
    } else {
      this.userList = this.userListLocal;
    }

    this.userList.forEach((element: User) => {
      if (element.status == true) {
        this.loginService.$loggedInUserSubject.next(element);
        this.router.navigate(['/']);
      }
    });
  }

}
