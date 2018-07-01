import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  $loggedInUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  $loggedInUser: Observable<User>;

  constructor() {
    this.$loggedInUser = this.$loggedInUserSubject.asObservable();
   }
}
