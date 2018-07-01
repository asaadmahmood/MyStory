import { Component, OnInit, Inject } from '@angular/core';
import { UserMsg } from '../../interfaces/user-msg';
import { User } from '../../interfaces/user';
import { LoginService } from '../../services/login.service';
import { MessageService } from '../../services/message.service';
import { ViewService } from '../../services/view.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { FeedDialogComponent } from '../feed-dialog/feed-dialog.component';

@Component({
  selector: 'ms-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  currentUser: User;
  msgListLocal: any;
  userListLocal: any;
  hasMessage = false;
  userPost = '';
  msgList: Array<UserMsg> = [];
  userList: Array<User> = [];
  currentMsg: UserMsg;
  currentPost: '';
  viewState = 'public';
  viewStateLocal = '';
  regexMsg: string;
  publicPostCount = 0;
  privatePostCount = 0;
  userPublicPostCount = 0;
  userPrivatePostCount = 0;
  deletePostFlag = false;

  constructor(
    private loginService: LoginService,
    private msgService: MessageService,
    private viewService: ViewService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

    this.msgListLocal = (localStorage.getItem('msgListLocal') !== null) ? JSON.parse(localStorage.getItem('msgListLocal')) : [];
    if (!this.msgListLocal || this.msgListLocal.length === 0) {
      this.msgList;
    } else {
      this.msgList = this.msgListLocal;
    }

    this.userListLocal = (localStorage.getItem('userListLocal') !== null) ? JSON.parse(localStorage.getItem('userListLocal')) : [];

    if (!this.userListLocal || this.userListLocal.length === 0) {
      this.userList;
    } else {
      this.userList = this.userListLocal;
    }

    this.msgList.forEach(element => {
      if (element.public && !element.deleted) {
        this.publicPostCount++
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Hide', {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.loginService.$loggedInUser
      .subscribe((value) => {
        this.currentUser = value;
        if (this.currentUser) {
          this.userPublicPostCount = value.publicCount;
          this.userPrivatePostCount = value.privateCount;
        }
      });

    this.msgService.$currentMsg
      .subscribe((value) => {
        this.currentMsg = value;
      });

    this.viewService.$viewState
      .subscribe((value) => {
        this.viewState = value;
      });

    if (localStorage.getItem('viewStateLocal')) {
      this.viewStateLocal = JSON.parse(localStorage.getItem('viewStateLocal'));
      this.viewState = this.viewStateLocal;
    }
  }

  editPost(message) {
    this.msgList.forEach(element => {
      element.editing = false;
    });
    message.editing = true;
  }

  deletePost(message) {
    console.log(message);

    if (message) {
      message.editing = false;
      message.deleted = true;
      this.deletePostFlag = false;

      this.msgService.deleteMessage(message)
        .subscribe((deletedMessage: UserMsg) => {
          localStorage.setItem('msgListLocal', JSON.stringify(this.msgList));
          this.openSnackBar('Message Deleted');
        });

      if (message.public) {
        this.publicPostCount--;
        this.userPublicPostCount--;
        this.updateUserCount('public');
      } else {
        this.userPrivatePostCount--;
        this.updateUserCount('private');
      }
    }
  }

  savePost(post) {
    this.regexMsg = this.removeSpaces(post.message);

    if (this.regexMsg != '\n' && this.regexMsg) {
      this.msgService.updateMessage(post)
        .subscribe((message: UserMsg) => {
          this.msgList[post.msgId].message = post.message;
          this.msgList[post.msgId].editing = false;
          localStorage.setItem('msgListLocal', JSON.stringify(this.msgList));
          this.openSnackBar('Message Saved');
        });

    } else {
      this.deletePostFlag = true;
    }
  }

  updateUserCount(type) {
    if (type == 'public') {
      this.userList[this.currentUser.userId].publicCount = this.userPublicPostCount;
      localStorage.setItem('userListLocal', JSON.stringify(this.userList));
    } else {
      this.userList[this.currentUser.userId].privateCount = this.userPrivatePostCount;
      localStorage.setItem('userListLocal', JSON.stringify(this.userList));
    }
  }

  editingChange(post) {
    this.regexMsg = this.removeSpaces(post.message);

    if (this.regexMsg != '\n' && this.regexMsg) {
      this.deletePostFlag = false;
    }
  }

  stopEditing(post) {
    this.msgListLocal = (localStorage.getItem('msgListLocal') !== null) ? JSON.parse(localStorage.getItem('msgListLocal')) : [];
    post.message = this.msgListLocal[post.msgId].message;
    this.msgList[post.msgId].editing = false;
  }

  postPublicly() {
    this.openSnackBar('Message Created');
    this.regexMsg = this.removeSpaces(this.userPost);
    if (this.regexMsg != '\n' && this.regexMsg) {
      this.userPost = this.regexMsg;

      this.currentMsg = {
        msgId: this.msgList.length,
        user: this.currentUser.email,
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        public: true,
        message: this.regexMsg,
        date: Date(),
        editing: false,
        deleted: false
      }

      this.msgService.addMessage(this.currentMsg)
        .subscribe((message: UserMsg) => {
          this.msgList.push(this.currentMsg);
          this.userPublicPostCount++;
          this.updateUserCount('public');
          localStorage.setItem('msgListLocal', JSON.stringify(this.msgList));
          this.userPost = '';
          this.privatePostCount++;
          this.hasMessage = false;
        });
    }
  }

  postPrivately() {
    this.openSnackBar('Message Created');
    if (this.userPost) {
      this.userPost = this.regexMsg;

      this.currentMsg = {
        msgId: this.msgList.length,
        user: this.currentUser.email,
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        public: false,
        message: this.regexMsg,
        date: Date(),
        editing: false,
        deleted: false
      }

      this.msgService.addMessage(this.currentMsg)
        .subscribe((message: UserMsg) => {
          this.msgList.push(this.currentMsg);
          this.userPrivatePostCount++;
          this.updateUserCount('private');
          localStorage.setItem('msgListLocal', JSON.stringify(this.msgList));
          this.userPost = '';
          this.publicPostCount++;
          this.hasMessage = false;
        });
    }
  }

  removeSpaces(message) {
    return message.replace(/[\r\n]+/g, '\n');
  }

  messageFlag() {
    if (this.userPost) {
      this.regexMsg = this.removeSpaces(this.userPost);
      if (this.regexMsg != '\n') {
        this.hasMessage = true;
      }
    } else {
      this.hasMessage = false;
    }
  }

  openDeleteDialog(message) {
    let dialogRef = this.dialog.open(FeedDialogComponent, {
      data: { message }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePost(result.message);
      }
    });
  }

}
