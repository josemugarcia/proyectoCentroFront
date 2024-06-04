import { Component, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SpinnerService } from '../services/spinner.service';
import { filter } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css'],
})
export class PanelAdminComponent{ //implements AfterViewInit 
  nombreUsuario: string = '';
  
  constructor(private router: Router, private spinnerService: SpinnerService, private authService: AuthService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.openSpinner();
      });
  }
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     const toggle = document.querySelector(".toggle");
  //     const navigation = document.querySelector(".navigation");
  //     const main = document.querySelector(".main");

  //     if (toggle && navigation && main) {
  //       toggle.addEventListener("click", () => {
  //         navigation.classList.toggle("active");
  //         main.classList.toggle("active");
  //       });
  //     } else {
  //       console.error("One or more elements not found.");
  //     }
  //   }, 100); // Espera 100 milisegundos antes de ejecutar el código
  // }
  
  
  

  
 
  
  

  ngOnInit(): void {
    this.authService.getNombreUsuario().subscribe((nombreUsuario: string) => {
      this.nombreUsuario = nombreUsuario;
    });
  }

  logout(){
    this.spinnerService.open();
    localStorage.removeItem('token');
    console.log("hola");
    this.router.navigate(['/login']).then(() => {
      this.checkToken(); 
    });
  }

  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token is still present:', token);
    } else {
      console.log('Token has been removed');
    }
  }

  openSpinner() {
    this.spinnerService.open();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 1000);
  }
}
