import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { User } from '../interfaces/api-user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('mystory-token');
  }

  login(credentials) {
    return this.http.post<User>(`${environment.apiBaseUrl}user/login`, {
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
    return this.http.post<User>(`${environment.apiBaseUrl}user/update`, {
      user: credentials
    });
  }

  deleteUser(credentials) {
    return this.http.post<User>(`${environment.apiBaseUrl}user/delete`, {
      user: credentials
    });
  }

  getUsers() {
    return this.http.get(`${environment.apiBaseUrl}user/users/`);
  }

  saveUser(credentials) {
    return this.http.post<User>(`${environment.apiBaseUrl}user/signup`, {
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
