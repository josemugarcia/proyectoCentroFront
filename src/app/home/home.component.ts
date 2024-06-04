import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service'; 
import { AuthService } from '../services/auth.service'; 

declare var initializeDropdownMenu: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = '';
  
  constructor(private router: Router, private spinnerService: SpinnerService, private authService: AuthService) { }

  ngOnInit(): void {
    initializeDropdownMenu();

    this.authService.getNombreUsuario().subscribe(nombreUsuario => {
      this.nombreUsuario = nombreUsuario;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.openSpinner(); // Llama a openSpinner cuando ocurre un evento de navegación
      });
  }

  logout() {
    this.spinnerService.open(); // Muestra el spinner durante el logout
    localStorage.removeItem('token'); // Elimina el token del almacenamiento localç
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
    this.spinnerService.open(); // Abre el spinner

    setTimeout(() => {
      this.spinnerService.hide(); // Cierra el spinner después de un segundo
    }, 1000);
  }
}
