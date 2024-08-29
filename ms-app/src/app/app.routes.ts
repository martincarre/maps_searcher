import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import("./home/index/index.component").then(c => c.IndexComponent),
        title: 'Maps Business Searcher',
    },
    {
        path: 'user',
        children: [
            {
                path: 'login',
                loadComponent: () => import("./user/login/login.component").then(c => c.LoginComponent),
                title: 'Login',
            },
            {
                path: 'signup',
                loadComponent: () => import("./user/signup/signup.component").then(c => c.SignupComponent),
                title: 'Signup',
            }
        ]
    }
];
