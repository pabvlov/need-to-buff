import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../utils/services/user.service';
import { AthleteUser, User } from '../../../utils/interfaces/find-users-response';
import { CommonModule } from '@angular/common';
import { Worklines } from '../../../utils/interfaces/worklines';
import { WorklineService } from '../../../utils/services/workline.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalService } from '../../../utils/services/swal.service';
import { CreateAthlete } from '../../../utils/interfaces/create-athlete';
import { ResponseAthlete } from '../../../utils/interfaces/post-athlete';
import { CommunityService } from '../../../utils/services/community.service';
import { Establishment } from '../../../utils/interfaces/gym-landing-info';
import { SimplePost } from '../../../utils/interfaces/simple-post';

@Component({
  selector: 'app-athletes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './athletes.component.html',
  styleUrl: './athletes.component.css'
})
export class AthletesComponent {
  @ViewChild('cerrar') cc: any;
  id: number = 0;

  constructor(private route: ActivatedRoute, 
              private userService: UserService, 
              private worklineService: WorklineService, 
              private communityService: CommunityService,
              private fb: FormBuilder,
              private swal: SwalService) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.id = res['id_establishment'];
    });
  }

  get getUsers(): User[] {
    return this.userService.getUsers;
  }

  get athletes(): AthleteUser[] {
    return this.userService.athletes
  }

  get worklines(): Worklines[] {
    return this.worklineService.worklines;
  }

  get establishments(): Establishment[] {
    return this.communityService.getEstablishments;
}

  createClient = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
  });

  createAthlete = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    birthdate: ['', [Validators.required, Validators.nullValidator]],
    id_user_in_charge: [0, [Validators.required]],
    id_establishment: [0, [Validators.required]],
    id_workline: [0, [Validators.required]],
  });

  get mail() {
    return this.createClient.get('mail')!.value;
  }
  
  addClient() {
    this.swal.loading();
    this.userService.createClient(this.mail!, this.id).subscribe( (data: ResponseAthlete) => {
      if (data.affectedRows != 0) {
        this.swal.success(
          'Client registered successfully',
          'El usuario ahora es tu cliente y aparecerá en tu dashboard'
        );
        this.userService.fillUsersByEstablishment(this.id);
      } else {
        this.swal.error('Error', data.message!);
      }
    });
  }

  addAthlete() {
    this.swal.loading();
    const athlete: CreateAthlete = {
      name: this.createAthlete.value.name!?.toString(),
      lastname: this.createAthlete.value.lastname!?.toString(),
      birthdate: this.createAthlete.value.birthdate!?.toString(),
      id_user_in_charge: this.createAthlete.value.id_user_in_charge!,
      id_establishment: this.id,
      id_workline: this.createAthlete.value.id_workline!
    };
    this.userService.createAthlete(athlete).subscribe( (data: ResponseAthlete) => {
      if (data.affectedRows != 0) {
        this.swal.success(
          'Athlete created successfully',
          'El usuario ahora es tu cliente y aparecerá en tu dashboard'
        );
        this.userService.fillUsersByEstablishment(this.id);
      } else {
        this.swal.error('Error', data.message!);
      }
    });
  }

  makeAdmin(mail: string) {
    this.swal.loading();
    console.log(mail);
    
    this.userService.makeAdmin(mail, this.establishments.find(e => e.id == this.id)!.id).subscribe( (data: SimplePost) => {
      if (data.affectedRows != 0) {
        this.swal.success(
          'Admin created successfully',
          'El usuario ahora es administrador de ' + this.establishments.find(e => e.id == this.id)?.name
        );
        this.userService.fillUsersByEstablishment(this.id);
      } else {
        this.swal.error('Error', data.message!);
      }
    });
  }

  removeAdmin(mail: string) {
    this.swal.loading();
    this.userService.removeAdmin(mail, this.establishments.find(e => e.id == this.id)!.id).subscribe( (data: SimplePost) => {
      if (data.affectedRows != 0) {
        this.swal.success(
          'Admin removed successfully',
          'El usuario ya no es administrador de ' + this.establishments.find(e => e.id == this.id)?.name
        );
        this.userService.fillUsersByEstablishment(this.id);
      } else {
        this.swal.error('Error', data.message!);
        
      }
    });
  }
}
