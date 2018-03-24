import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserRepositoryService } from '../core';

@Component({
    styleUrls: ['./sign-in.component.scss'],
    templateUrl: './sign-in.component.html'
})
export class SignInComponent {
    credentials: any = {};

    constructor(private router: Router, private userRepository: UserRepositoryService) { }

    signIn(credentials: any): void {
        this.userRepository.signIn(credentials).subscribe(
            null,
            (err: any) => { console.error(err, 'Error'); },
            () => this.router.navigate(['/catalog'])
        );
    }

    cancel(): void {
        this.router.navigate(['/']);
    }
}

