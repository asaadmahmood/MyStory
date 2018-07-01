import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  $viewStateSubject: BehaviorSubject<string> = new BehaviorSubject('public');
  $viewState: Observable<string>;

  currentState: string;

  constructor() {
    this.$viewState = this.$viewStateSubject.asObservable();
   }
}
