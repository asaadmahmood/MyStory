import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { UserMsg } from '../interfaces/user-msg';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  $currentMsgSubject: BehaviorSubject<UserMsg> = new BehaviorSubject(null);
  $currentMsg: Observable<UserMsg>;

  constructor(
    private http: HttpClient
  ) {
    this.$currentMsg = this.$currentMsgSubject.asObservable()
  }

  getMessages() {
    return this.http.get<{ message: UserMsg[] }>('http://localhost:3000/message')
      .pipe(
        map((response) => {
          return response.message;
        })
      );
  }

  updateMessage(message: UserMsg) {
    return this.http.post<{ message: UserMsg }>('http://localhost:3000/message/update', {
      message: message
    })
      .pipe(
        map((response) => {
          return response.message;
        })
      );
  }

  addMessage(message: UserMsg) {
    return this.http.post<{ message: UserMsg }>('http://localhost:3000/message', {
      message: message
    })
      .pipe(
        map((response) => {
          return response.message;
        })
      );
  }

  deleteMessage(message: UserMsg) {
    return this.http.post<{ message: UserMsg }>('http://localhost:3000/message/delete', {
      message: message
    })
      .pipe(
        map((response) => {
          return response.message;
        })
      );
  }

}
