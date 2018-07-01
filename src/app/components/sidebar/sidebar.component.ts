import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'ms-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() viewChange = new EventEmitter<any>();
  userListLocal: any;
  viewState = 'public';
  viewStateLocal = '';
  userList: Array<User> = [];

  constructor(
    private viewService: ViewService
  ) {
    this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];

    if (!this.userListLocal || this.userListLocal.length === 0) {
      this.userList;
    } else {
      this.userList = this.userListLocal;
    }
  }

  ngOnInit() {
    this.viewStateLocal = JSON.parse(localStorage.getItem('viewStateLocal'));
    if (this.viewStateLocal) {
      this.viewState = this.viewStateLocal;
    }
  }

  changeView(state) {
    this.viewService.$viewStateSubject.next(state);
    this.viewState = state;
    localStorage.setItem('viewStateLocal', JSON.stringify(this.viewState));
  }

}
