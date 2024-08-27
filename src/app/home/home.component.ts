import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  /* screen width */
  screenWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }




}
