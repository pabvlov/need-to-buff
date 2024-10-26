import { Component, Input, OnChanges } from '@angular/core';
import { Establishment } from '../../../utils/interfaces/user-communities';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Community } from '../../../utils/interfaces/gym-landing-info';
import { environment } from '../../../environments/environment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { CommunityService } from '../../../utils/services/community.service';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css'
})
export class ConfigurationComponent {

  id_community: number = 0;
  id_establishment: number = 0;
  @Input() establishments: Establishment[] = [];
  @Input() community!: Community;

  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private communityService: CommunityService
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id_establishment = res['id_establishment'];
      this.id_community = res['id_community'];
    });

    this.communityForm.setValue({
      social_reason: this.community.razon_social,
      acronym: this.community.acronym,
      contact: this.community.contact,
      facebook: this.community.facebook,
      instagram: this.community.instagram
    });

    this.establishmentForm.setValue({
      name: this.establishment!.name,
      address: this.establishment!.address,
      capacity: this.establishment!.capacity
    });
  }

  get establishment() {
    return this.establishments.find(e => e.id == this.id_establishment);
  }

  onSubmit() {
    console.log(this.communityForm.value);
  }

  communityForm = new FormGroup({
    social_reason: new FormControl(''),
    acronym: new FormControl(''),
    contact: new FormControl(),
    facebook: new FormControl(''),
    instagram: new FormControl('')
  });

  establishmentForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    capacity: new FormControl()
  });

  get imagePath() {
    return environment.apiUrl + "/profiles/";
  }

  changePicture($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];
      console.log(this.selectedFile);
      this.communityService.changeProfilePicture(this.selectedFile, this.id_community).subscribe({
        next: (response) => {
          this.communityService.setGymLandingInfo(this.id_community);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

}
