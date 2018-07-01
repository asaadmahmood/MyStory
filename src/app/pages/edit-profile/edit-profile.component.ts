import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { AuthService } from '../../api-services/auth.service';

@Component({
  selector: 'ms-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userListLocal: any;

  errorMsg = '';
  profilePic = 'assets/placeholder.png';
  errorFlag = false;
  userList: Array<User> = [];
  dbUsers;
  currentUser: User;


  constructor(
    public router: Router,
    private authService: AuthService
  ) {
    this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];
    this.currentUser = (localStorage.getItem('currentUser') !== null) ? JSON.parse(localStorage.getItem('currentUser')) : [];

    if (!this.userListLocal || this.userListLocal.length === 0) {
      this.userList;
    } else {
      this.userList = this.userListLocal;
    }
  }

  dismissError() {
    this.errorFlag = false;
  }

  updateCurrentUser() {
    if (
      this.currentUser.firstName == '' ||
      this.currentUser.lastName == '' ||
      this.currentUser.username == '' ||
      this.currentUser.email == ''
    ) {
      this.errorMsg = 'Please fill out all the fields';
      this.errorFlag = true;
    } else {
      this.errorFlag = false;
    }

    if (this.errorFlag == false && this.userList) {
      this.userList.forEach((element: User) => {
        if ((element.username == this.currentUser.username || element.email == this.currentUser.email) && element.userId != this.currentUser.userId) {
          this.errorFlag = true;
          this.errorMsg = 'The username or email is already in use.';
        }
      });
    }

    if (this.errorFlag == false) {
      this.userList[this.currentUser.userId] = this.currentUser;

      localStorage.setItem('userListLocal', JSON.stringify(this.userList));
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.router.navigate(['/']);

      // Saving in Database
      this.authService.updateUser(this.currentUser)
        .subscribe(data => {
          this.ngOnInit();
        })
    }
  }

  deleteUser() {
    this.currentUser.active = false;
    this.userList[this.currentUser.userId].active = this.currentUser.active;
    localStorage.setItem('userListLocal', JSON.stringify(this.userList));

    // Saving in Database
    this.authService.deleteUser(this.currentUser)
      .subscribe(data => {
        localStorage.removeItem('currentUser');
        this.authService.logout();
        this.router.navigate(['/']);
      })

  }

  ngOnInit() {
  }

}
