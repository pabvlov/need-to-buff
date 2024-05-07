import { Routes } from '@angular/router';
import { HomeModule } from './home/home.module';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => HomeModule },
];
