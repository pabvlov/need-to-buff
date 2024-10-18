import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
 /* mat card */
import { MatCardModule } from '@angular/material/card';
import { CommunityService } from '../../../utils/services/community.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../utils/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './banners.component.html',
  styleUrl: './banners.component.css'
})
export class BannersComponent implements OnInit {

  id_establishment: number = 0;

  constructor(private communityService: CommunityService, private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
    });
  }

  get banners() {
    return this.communityService.banners;
  }

  picture: any = new Event('');

  createBanner = this.fb.group({
    description: []
  });

  handleFileInput($event: Event) {
    this.picture = $event;
    let formData = new FormData();
    formData.append('file', this.picture.target!.files[0]);
    console.log(this.picture);
    
  }

  addBanner() {
    console.log("asdasd");
    
    this.communityService.createBanner(this.createBanner.value.description!, this.picture, this.id_establishment, this.authService.user.id);
  }

}
