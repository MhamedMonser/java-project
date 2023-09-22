import { Routes } from '@angular/router';

import { Home2Component } from '../home/home.component';
import { User2Component } from '../user/user.component';
import { Tables2Component } from '../tables/tables.component';
import { VidComponent } from '../videoList/user.component';

export const adminLayoutRoutes: Routes = [
    { path: 'admin-dashboard',      component: Home2Component },
    { path: 'allUsers',           component: User2Component },
    { path: 'allTranslators',          component: Tables2Component },
    { path: 'allVideos',          component: VidComponent },

    
];
