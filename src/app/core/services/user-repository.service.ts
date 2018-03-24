import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/delay';

import { User } from '../../models';

const users: Array<any> = [
  {
    userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
    firstName: 'Jim',
    lastName: 'Cooper',
    email: 'someones-email@gmail.com',
    password: 'supersecret',
    classes: ['24ab7b14-f935-44c1-b91b-8598123ea54a']
  }
];

@Injectable()
export class UserRepositoryService {
  currentUser: User;

  constructor() {}

  public saveUser(user: User): Observable<User> {
    this.currentUser = Object.assign({}, user, { classes: user.classes || [] });

    return Observable.empty<User>().delay(1000);
  }

  public enroll(classId: string): Observable<User> {
    if (!this.currentUser) {
      return Observable.throw('User not signed in');
    }

    if (this.currentUser.classes.includes[classId]) {
      return Observable.throw('Already enrolled');
    }

    this.currentUser = Object.assign({}, this.currentUser, {
      classes: this.currentUser.classes.concat([classId])
    });

    return Observable.empty<User>().delay(1000);
  }

  public drop(classId: any): Observable<User> {
    if (!this.currentUser) { return Observable.throw('User not signed in'); }

    if (!this.currentUser.classes.includes(classId)) {
      return Observable.throw('Not enrolled');
    }

    this.currentUser = Object.assign({}, this.currentUser, {
      classes: this.currentUser.classes.filter(c => c.classId !== classId)
    });

    return Observable.empty<User>().delay(1000);
  }

  public signIn(credentials: User): Observable<User> {
    if (
      credentials.email !== 'me@whitebeards.edu' ||
      credentials.password !== 'super-secret'
    ) {
      return Observable.throw('Invalid login');
    }

    this.currentUser = {
      userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
      firstName: 'Jim',
      lastName: 'Cooper',
      email: 'me@whitebeards.edu',
      classes: ['24ab7b14-f935-44c1-b91b-8598123ea54a'],
      connected: true
    };

    return Observable.empty<User>();
  }
}
