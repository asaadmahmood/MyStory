import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userListLocal: any;

  errorMsg = '';
  errorFlag = false;
  userList: any;

  constructor(
    public router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  dismissError() {
    this.errorFlag = false;
  }

  loginUser(form) {
    if (form.valid) {
      if (this.userList.length == 0) {
        this.errorFlag = true;
        this.errorMsg = 'We currently have no users on the system, please register';
      }

      if (this.errorFlag == false) {
        this.authService.login(form.value)
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
    this.authService.getUsers()
    .subscribe(data => {
      this.userList = data;
    })
  }

}
