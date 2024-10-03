import { Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => HomeModule },
    { 
        path: 'admin', 
        loadChildren: () => AdminModule,
        canActivate: [authGuard] 
    },
    { path: 'auth', loadChildren: () => AuthModule }
];
