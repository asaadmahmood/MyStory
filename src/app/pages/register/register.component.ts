import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login.service';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userListLocal: any;

  _id: number;
  errorMsg = '';
  userImg = 'assets/placeholder.png';
  userStatus = false;
  errorFlag = false;
  userList: Array<User> = [];
  dbUsers;
  localUser: User;

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

  dismissError() {
    this.errorFlag = false;
  }

  registerUser(form) {
    if (form.valid) {
      if (this.errorFlag == false && this.userList) {
        this.userList.forEach((element: User) => {
          if (element.username == form.value.username || element.email == form.value.email) {
            this.errorFlag = true;
            this.errorMsg = 'The username or email is already in use.';
          }
        });
      }

      this.localUser = {
        userId: this.userList.length,
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
        status: true,
        profilePic: this.userImg,
        publicCount: 0,
        privateCount: 0,
        active: true
      }

      if (this.errorFlag == false) {
        this.userList.push(
          this.localUser
        )

        this.authService.saveUser(this.localUser)
        .subscribe((result) => {
          localStorage.setItem('userListLocal', JSON.stringify(this.userList));
          localStorage.setItem('currentUser', JSON.stringify(result.user));
          this.loginService.$loggedInUserSubject.next(result.user);
          this.router.navigate(['/']);
        }, (err) => {
          this.errorFlag = true;
          this.errorMsg = err.error.error.message;
        });
      }
    }
  }

  ngOnInit() {
  }

}
