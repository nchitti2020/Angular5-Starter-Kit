
import { Subject } from 'rxjs/Subject';
import { User } from './../models/user.model';

export class UserListService {
  usersChanged = new Subject<User[]>();
  startedEditing = new Subject<number>();
  private users: User[] = [
    new User({
       firstName: 'Narayana',
       lastName: 'Chitti'
    }),
    new User({
      firstName: 'Benny',
      lastName: 'Mathew'
    })
  ];

  getUsers() {
    /*
      Use slice to get a copy of the object.
      In javascript by default we get reference of the object
    */
    return this.users.slice();
  }

  getUser(index: number) {
    return this.users[index];
  }

  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  addUsers(users: User[]) {
    // for (let user of users) {
    //   this.addUser(user);
    // }

    /*  Use ES6 spread operator (...) instead of using for loop to simplify code */
    this.users.push(...users);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(index: number, newUser: User) {
    this.users[index] = newUser;
    this.usersChanged.next(this.users.slice());
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
    this.usersChanged.next(this.users.slice());
  }
}
