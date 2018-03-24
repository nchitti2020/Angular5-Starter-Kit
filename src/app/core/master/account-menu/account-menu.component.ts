import {Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '@app/models';
import { AuthenticationService } from '@app/core/authentication/authentication.service';

@Component({
    selector: 'app-account-menu',
    styleUrls: ['./account-menu.component.scss'],
    templateUrl: './account-menu.component.html'
})
export class AccountMenuComponent {
    @Input() private user: User;
    // @Input() private username: string;
    @Output() private signedOut: EventEmitter<any> = new EventEmitter<any>();

    public showMenu: boolean;

    constructor(private authenticationService: AuthenticationService,
                private router: Router) {}

    public signOut(): void {
        this.showMenu = false;
        this.signedOut.emit();
    }

    logout() {
      this.authenticationService.logout()
        .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
    }

    get username(): string | null {
      const credentials = this.authenticationService.credentials;
      return credentials ? credentials.username : null;
    }
}
