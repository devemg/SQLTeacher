import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserType } from '../models/user-type';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userType: UserType = UserType.NULL;
  private userTypeBehaviour: BehaviorSubject<UserType> = new BehaviorSubject<UserType>(UserType.NULL);
  constructor() { }

  setUserType(type: UserType): void {
    this.userType = type;
    this.userTypeBehaviour.next(type);
  }

  getUserType(): UserType {
    return this.userType;
  }

  getUserTypeObservable(): Observable<UserType> {
    return this.userTypeBehaviour.asObservable();
  }
}
