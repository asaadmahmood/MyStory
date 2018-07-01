import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { User } from '../interfaces/api-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('mystory-token');
  }

  login(credentials) {
    return this.http.post<User>('http://localhost:3000/user/login', {
      user: credentials
    })
    .pipe(
      tap((response) => {
        this.token = response.user.token;
        localStorage.setItem('mystory-token', this.token);
      })
    );
  }

  updateUser(credentials) {
    return this.http.post<User>('http://localhost:3000/user/update', {
      user: credentials
    });
  }

  deleteUser(credentials) {
    return this.http.post<User>('http://localhost:3000/user/delete', {
      user: credentials
    });
  }

  getUsers() {
    return this.http.get('http://localhost:3000/user/users/');
  }

  saveUser(credentials) {
    return this.http.post<User>('http://localhost:3000/user/signup', {
      user: credentials
    })
    .pipe(
      tap((response) => {
        this.token = response.user.token;
        localStorage.setItem('mystory-token', this.token);
      })
    );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('mystory-token');
  }
}
