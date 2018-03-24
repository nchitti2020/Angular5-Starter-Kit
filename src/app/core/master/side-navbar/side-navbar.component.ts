import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-side-navbar',
    styleUrls: [`./side-navbar.component.scss`],
    templateUrl: './side-navbar.component.html'
})
export class SideNavBarComponent {
    @Input() public sideMenuItems = ['Google', 'Microsoft', 'Apple'];

    constructor() { }
}
