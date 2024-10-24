import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../utils/services/auth.service';
import { SwalService } from '../../utils/services/swal.service';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule
  ],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css'
})
export class ProfileMenuComponent {

  constructor(
    private authService:  AuthService,
    private swal:         SwalService,
  ) { 
    this.authService.renewSession();
  }

  closeSession() {
    this.swal.confirm('Confirmar', '¿Estás seguro de cerrar sesión?', 'Sí', 'No', () => {
      this.authService.logout();
    });
  }
}
