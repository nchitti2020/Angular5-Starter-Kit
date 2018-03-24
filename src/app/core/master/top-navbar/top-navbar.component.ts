import { Component } from '@angular/core';
import { UserRepositoryService } from '../../services/user-repository.service';

@Component({
    selector: 'app-top-navbar',
    styleUrls: [`./top-navbar.component.scss`],
    templateUrl: './top-navbar.component.html'
})
export class TopNavBarComponent {
    constructor(private userRepository: UserRepositoryService) { }

    public get currentUser(): any {
        return this.userRepository.currentUser;
    }

    public handleSignOut(): void {
        this.userRepository.currentUser = null;
    }
}
