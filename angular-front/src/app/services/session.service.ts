import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserType } from '../models/user-type';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userTypeBehaviour: BehaviorSubject<UserType> = new BehaviorSubject<UserType>(UserType.NULL);
  constructor() { }

  setUserType(type: UserType): void {
    this.userTypeBehaviour.next(type);
  }

  getUserTypeObservable(): Observable<UserType> {
    return this.userTypeBehaviour.asObservable();
  }
}
