import { Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => HomeModule },
    { path: 'admin', loadChildren: () => AdminModule },
    { path: 'auth', loadChildren: () => AuthModule }
];
