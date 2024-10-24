import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Community } from '../../utils/interfaces/user-communities';
import { UserService } from '../../utils/services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';

@Component({
  selector: 'app-choose-gym-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './choose-gym-landing.component.html',
  styleUrl: './choose-gym-landing.component.css'
})
export class ChooseGymLandingComponent implements OnInit, AfterContentInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  get communities(): Community[] {
    return this.userService.communities;
  }
  
  ngOnInit(): void {
    this.userService.getCommunities();
  }

  ngAfterContentInit(): void {
  }

  logout() { // removemos token jwt del localstorage, por lo tanto desloguea al usuario y lo manda al inicio
    this.authService.logout();
  }  

}
