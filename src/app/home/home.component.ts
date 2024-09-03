import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../utils/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  /* screen width */
  screenWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    if(this.auth.isAuthenticated()) {
      /* redirect to choose component */
      this.router.navigate(['/home/choose'])
    }
  }



}
