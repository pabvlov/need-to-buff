import { Component } from '@angular/core';
import { UserService } from '../../utils/services/user.service';
import { AuthService } from '../../utils/services/auth.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /* variables */
  info: string = '';
  step = 0;
  passInfo: string = '';

  /* constructor and init methods */
  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService,
    private router: Router) {
    if (this.authService.isAuthenticated()) {
      window.location.href = '/';
    }
  }

  ngOnInit(): void {

  }

  /* forms */
  personForm = this.fb.group({
    apodo: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: ['', Validators.required],
    genero: ['M', Validators.required],
    contacto: [, [Validators.required, Validators.pattern('^[0-9]*$')]],
    nacimiento: [new Date(), Validators.required]
  });

  passwordForm = this.fb.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    recuerdame: [true]
  });

  /* getters */

  get fullname() {
    return `${this.personForm.get('nombres')?.value} ${this.personForm.get('apellidos')?.value}`;
  }

  /* methods */

  next() {
    this.step++;
  }

  register() {
    if (this.personForm.valid && this.passwordForm.valid) {
      if (this.passwordForm.get('password')?.value !== this.passwordForm.get('confirmPassword')?.value) {
        this.passInfo = 'Las contraseñas no coinciden';
      } else {
        const { apodo, nombres, apellidos, email, genero, contacto, nacimiento } = this.personForm.value;
        const { password } = this.passwordForm.value;
        this.authService.registerUser(email!, apodo!, nombres!, apellidos!, genero!, contacto!, nacimiento!, password!).subscribe((data: any) => {
          if (data.ok == false) {
            this.passInfo = data.message;
          }
          if (data.ok == true) {
            this.passInfo = 'Usuario registrado con éxito';
            delay(2000);
            this.authService.loginUser(email!, password!)
              .subscribe(resp => {
                if (resp) {
                  this.router.navigate(['/app/profile']);
                }
              })
          }
        }, (error: any) => {
          console.log(error.error);
          this.passInfo = error.error.message;
        }
        );
      }


    } else {
      this.info = 'Debe completar todos los campos';
      this.step = 0;
    }
  }
}
