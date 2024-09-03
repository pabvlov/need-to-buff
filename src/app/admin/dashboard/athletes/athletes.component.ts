import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../utils/services/user.service';
import { User } from '../../../utils/interfaces/find-users-response';
import { CommonModule } from '@angular/common';
import { Worklines } from '../../../utils/interfaces/worklines';
import { WorklineService } from '../../../utils/services/workline.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SwalService } from '../../../utils/services/swal.service';
import { PostAthlete } from '../../../utils/interfaces/post-athlete';

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

  get worklines(): Worklines[] {
    return this.worklineService.worklines;
  }

  createClient = this.fb.group({
    mail: ['', [Validators.required, Validators.email]],
  });

  get mail() {
    return this.createClient.get('mail')!.value;
  }
  
  addClient() {
    this.swal.loading();
    this.userService.createClient(this.mail!, this.id).subscribe( (data: PostAthlete) => {
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
}
