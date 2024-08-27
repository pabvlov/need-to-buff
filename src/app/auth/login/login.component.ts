import { Component, Inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';
import { Session } from '../../utils/interfaces/session';
import { UserService } from '../../utils/services/user.service';
import { FindUserResponse } from '../../utils/interfaces/find-user-response';
import { SwalService } from '../../utils/services/swal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /* variables */
  info: string = '';
  step = 0;
  passInfo: string = '';
  fullname: string = '';

  /* constructor and init methods */
  constructor( @Inject(FormBuilder) private fb: FormBuilder, private authService: AuthService, private userService: UserService, @Inject(Router) private router: Router, private swal: SwalService) {
    if (this.authService.isAuthenticated()) {
      window.location.href = '/';
    }
  }

  /* forms */
  personForm = this.fb.group({
    mail: ['', [Validators.required]],
  });

  passwordForm = this.fb.group({
    password: ['', Validators.required],
    recuerdame: [true]
  });

  /* getters */

  next() {
    this.swal.loading();
      this.userService.getUserByMail(this.personForm.value.mail!).subscribe((data: FindUserResponse) => {
        if (data.content != null) {
          this.swal.close();
          this.info = 'Usuario encontrado';
          this.fullname = `${data.content.name} ${data.content.lastname}`;
          this.step++;
        } else {
          this.info = 'Usuario no encontrado';
        }
      });
  }

  login() {
    this.swal.loading();
    this.authService.loginUser(this.personForm.value.mail!, this.passwordForm.value.password!)
      .subscribe(resp => {
        if (resp) {
          console.log(resp);
          if(this.passwordForm.value.recuerdame) {
            this.authService.rememberPassword(resp.content.user, this.passwordForm.value.password!);
          }
          this.router.navigate(['/home/choose'], { skipLocationChange: false })
          this.swal.close();
        } else {
          this.swal.close();
          this.swal.authFail("Contraseña incorrecta");
          this.passInfo = 'Contraseña incorrecta';
        }
      })
  }
}
