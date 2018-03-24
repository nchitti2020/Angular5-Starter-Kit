import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { environment } from '@env/environment';
import { User } from '@app/models';
import { UserListService } from '../services/user-list.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  providers: [UserListService]
})
export class AboutComponent implements OnInit, OnDestroy {

  version: string = environment.version;
  users: User[] = [];
  userCount: number;
  private subscription: Subscription;

  constructor(private userListService: UserListService) { }

  ngOnInit() {
    this.users = this.userListService.getUsers();
    this.userCount = this.users.length;
    this.subscription = this.userListService.usersChanged
                            .subscribe(
                              (users: User[]) => {
                                this.users = users;
                                this.userCount = this.users.length;
                              }
                            );
  }

  onAddUser() {
    const user = new User({
      firstName: 'User',
      lastName: '-' + (this.userCount + 1)
    });

    this.userListService.addUser(user);
  }

  onDeleteUser(index: number) {
    console.log(index);
    this.userListService.deleteUser(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
