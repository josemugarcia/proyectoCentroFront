import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getRolUsuarioSync();

    console.log('isAuthenticated:', isAuthenticated);
    console.log('userRole:', userRole);
    console.log('Attempting to access route:', state.url);

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    // Permitir a los administradores acceder a todas las rutas excepto "reservar_cita"
    if (userRole === 'admin') {
      if (state.url === '/home/reservar_cita') {
        this.router.navigate(['/home/inicio']);
        return false;
      }
      return true;
    }

    // Verificar el acceso del usuario basado en su rol y los roles permitidos en la ruta
    if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
      this.router.navigate(['/home/inicio']);
      return false;
    }

    return true;
  }
}
