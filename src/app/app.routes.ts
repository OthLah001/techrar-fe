import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-module').then((m) => m.AuthModule),
    },
    {
        path: 'campaigns',
        loadChildren: () => import('./campaigns/campaigns-module').then((m) => m.CampaignsModule),
    },
];
