import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor(private route: Router) { }

  success(title: string, text: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      text,
      showConfirmButton: false,
      timer: 1500
    })
  }

  error(title: string, text: string) {
    Swal.fire({
      position: 'top-end',
      title,
      text,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    })
  }

  warning(title: string, text: string) {
    Swal.fire({
      position: 'top-end',
      title,
      text,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    })
  }

  info(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    })
  }

  question(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'question',
      confirmButtonText: 'Aceptar'
    })
  }


  close() {
    Swal.close();
  }

  authFail(text: string = 'Debes iniciar sesión para acceder a esta sección') {
    let timerInterval: any;
      Swal.fire({
        position: 'top-end',
        text: text,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer()!.querySelector('b')
          timerInterval = setInterval(() => {
            
            if(b != null) b!.textContent = Swal.getTimerLeft()!.toString()
            
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
          this.route.navigate(['/login']);
        }
      })
  }

  loading(title: string = 'Cargando...') {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

  }

  stopLoading() {
    Swal.close();
  }

  confirm(title: string, text: string, confirmButtonText: string, cancelButtonText: string, callback: any) {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    })
  }
}
