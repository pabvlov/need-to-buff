import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
 /* mat card */
import { MatCardModule } from '@angular/material/card';
import { CommunityService } from '../../../utils/services/community.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../utils/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SwalService } from '../../../utils/services/swal.service';
import { environment } from '../../../environments/environment';

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
  id_community: number = 0;

  constructor(private communityService: CommunityService, 
              private fb: FormBuilder, 
              private authService: AuthService, 
              private route: ActivatedRoute,
              private swal: SwalService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
      this.id_community = res['id_community'];
    });

  }

  get banners() {
    return this.communityService.banners;
  }

  selectedFile: File | null = null;

  createBanner = this.fb.group({
    description: []
  });

  handleFileInput($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];
    }
  }

  addBanner() {
    
    if (this.createBanner.valid && this.selectedFile) {
      this.swal.loading();
      this.communityService.createBanner(this.createBanner.value!.description!, this.selectedFile, this.id_establishment, this.authService.getUserId()).subscribe({
        next: (response) => {
          this.swal.success('Subida de imagen', 'Banner creado exitosamente');
          this.communityService.setGymLandingInfo(this.id_community);
        },
        error: (error) => {
          console.error('Error creating banner', error);
          this.swal.close();
        }
      });
    }
  }

  get imagePath() {
    return environment.apiUrl + '/banners/';
  }

  isImage(url: string) {
    return url.toLocaleLowerCase()!.match(/\.(jpeg|jpg|gif|png)$/)  != null;
  }
}
