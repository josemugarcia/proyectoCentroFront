import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private nombreUsuarioSubject: BehaviorSubject<string>;
  private rolUsuarioSubject: BehaviorSubject<string>;
  private idUsuarioSubject: BehaviorSubject<number | null>;

  constructor() {
    this.idUsuarioSubject = new BehaviorSubject<number | null>(null);
    const nombreUsuario = localStorage.getItem('nombreUsuario') || '';
    const rolUsuario = localStorage.getItem('rolUsuario') || '';
    const token = localStorage.getItem('token');
    let idUsuario: number | null = null;

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        idUsuario = payload.idUsuario || null;
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }

    this.nombreUsuarioSubject = new BehaviorSubject<string>(nombreUsuario);
    this.rolUsuarioSubject = new BehaviorSubject<string>(rolUsuario);
    this.idUsuarioSubject.next(idUsuario);
  }

  setNombreUsuario(nombreUsuario: string): void {
    localStorage.setItem('nombreUsuario', nombreUsuario);
    this.nombreUsuarioSubject.next(nombreUsuario);
  }

  getNombreUsuario(): Observable<string> {
    return this.nombreUsuarioSubject.asObservable();
  }

  setRolUsuario(rolUsuario: string): void {
    localStorage.setItem('rolUsuario', rolUsuario);
    this.rolUsuarioSubject.next(rolUsuario);
  }

  getRolUsuario(): Observable<string> {
    return this.rolUsuarioSubject.asObservable();
  }

  setIdUsuario(userId: number): void {
    localStorage.setItem('idUsuario', userId.toString());
    console.log(userId);
  }

  getIdUsuario(): number | null {
    const userId = localStorage.getItem('idUsuario');
    return userId ? parseInt(userId) : null;
  }

  // Método para obtener el rol de usuario de forma síncrona
  getRolUsuarioSync(): string {
    return this.rolUsuarioSubject.value;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
