import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserRepositoryService } from '../core';

@Component({
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    firstName: FormControl;
    lastName: FormControl;
    email: FormControl;
    password: FormControl;
    private saving = false;

    constructor(
        private router: Router,
        private userRepository: UserRepositoryService
    ) { }

    ngOnInit(): void {
        this.firstName = new FormControl('', Validators.required);
        this.lastName = new FormControl('', Validators.required);
        this.email = new FormControl('', Validators.required);
        this.password = new FormControl('', Validators.required);

        this.registerForm = new FormGroup({
            'firstName': this.firstName,
            'lastName': this.lastName,
            'email': this.email,
            'password': this.password
        });
    }

    public registerUser(user: any): void {
        this.saving = true;
        this.saveAndRedirect(user);
    }

    public cancel(): void {
        this.router.navigate(['/']);
    }

    private saveAndRedirect(user: any): void {
        this.userRepository.saveUser(user).subscribe(
            null,
            () => this.saving = false,
            () => this.router.navigate(['/catalog'])
        );
    }
}
