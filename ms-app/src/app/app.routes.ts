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
    }
];
