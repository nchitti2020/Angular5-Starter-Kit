import { Routes } from '@angular/router';

export const routerConfig: Routes = [
    {
        path: 'users',
        loadChildren: 'app/users/users.module#UsersModule'
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
